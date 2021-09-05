```
on the Fleet endpoint
    - AircraftStatus:
        0 = Idle,
        1 = Maintenance,
        2 = ApronWork,
        3 = InFlight,
        4 = Warp,
        5 = Ferry
    - FuelType
        0 = 100LL, 
        1 = JET
    - EngineType
        0 = Piston
        1 = Jet
        2 = Sailplane
        3 = Helo Turbine
        4 = Rocket (unsupported)
        5 = Turboprop

on the Employees endpoint
    - Status
        0 = Idle, 
        1 = Resting, 
        2 = Training, 
        3 = Transporting, 
        5 = Flying, 
        7 = Ready, 
        8 = Relocating, 
        11 = Warp
    - Category
        1 = Pilot, 
        2 = CabinCrew, 
        3 = Mechanic

on the Flights endpoint
    - Category
        0 = Free
        1 = Checkride,
        2 = TestFlight
    - Engine*Status
        0 = NotBroken,
        1 = BrokenByPilot,
        2 = BrokenByEngineCondition
    - RegisterState
        0 = Not registered
        9 = Registered
        in between values should not be affected ever, there are internal statuses
```
