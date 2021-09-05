<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use App\Models\World;
use App\Services\OnAir\OnAirCompanyService;
use App\Models\Company;

class RegisteredUserController extends Controller
{
    protected function in_string ($words, $string, $option = "any")
    {
        if ($option == "all") {
            $isFound = true;
            foreach ($words as $value) {
                $isFound = $isFound && (stripos($string, $value) !== false); // returns boolean false if nothing is found, not 0
                if (!$isFound) break; // if a word wasn't found, there is no need to continue
            }
        } else {
            $isFound = false;
            foreach ($words as $value) {
                $isFound = $isFound || (stripos($string, $value) !== false);
                if ($isFound) break; // if a word was found, there is no need to continue
            }
        }
        return $isFound;
    }
    /**
     * Display the registration view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $worlds = World::where('is_enabled', true)->get();
        return Inertia::render('Auth/Register', [
            'appTitle' => env('APP_TITLE'),
            'worlds' => $worlds,
        ]);
    }

    public function load_company_details(OnAirCompanyService $companyService, Request $request)
    {
        $data = $request->json()->all();

        $world_slug = $data['world_slug'];
        $uuid = $data['uuid'];
        $api_key = $data['api_key'];

        $response = $companyService->query_details($world_slug, $api_key, $uuid);
        $translatedResponse = $companyService->translate($response);
        return response()->json($translatedResponse);
    }

    public function check_username(Request $request)
    {
        $input = $request->json()->all();
        $usernameInput = $input['username'];

        $reservedWords = [
            'admin',
            'superuser',
        ];

        $isAvailable = false;

        if ($this->in_string($reservedWords, $usernameInput)) {
            $isAvailable = false;
        } else {
            $countUsers = User::where('username', $usernameInput)->count();

            if ($countUsers <= 0) {
                $isAvailable = true;
            }
        }

        return response()->json($isAvailable);
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'username' => 'required|string|min:5|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);


        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('user');

        event(new Registered($user));

        Auth::login($user);

        return redirect('/');
    }
}
