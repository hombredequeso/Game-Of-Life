TestCase("PeriodicTimerTests", {
    test_Create_InitializesTimerState:function(){
        var module = MCAPP.periodicTimer;
        var timer = module.create();
        assertEquals(300, timer.interval);
        assertEquals(undefined, timer.timer);
    },
    test_SpecifiedInterval_Create_SetsInterval:function(){
        var module = MCAPP.periodicTimer;
        var timer = module.create(1234);
        assertEquals(1234, timer.interval);
    },
    test_Timer_Start_BeginsTimer:function(){
        var timer = MCAPP.periodicTimer.create();
        var setIntervalCalled = false;
        window.setInterval = function() {setIntervalCalled = true;};
        timer.start();
        assertTrue(timer.timer !== null);
        assertTrue(setIntervalCalled);
    },
    test_StartedTimer_IsRunning_True:function(){
        var timer = MCAPP.periodicTimer.create();
        timer.start();
        assertNotNull(timer.timer);
    },
    test_TimerRunning_Stop_EndsTimer:function(){
        var timer = MCAPP.periodicTimer.create();
        timer.start();
        timer.stop();
        assertNull(timer.timer);
    },
    test_TimerRunning_Start_DoesNothing:function(){
        var timer = MCAPP.periodicTimer.create();
        timer.start();
        assertNotNull(timer.timer);
        timer.start();
        assertNotNull(timer.timer);
    },
    test_TimerStopped_Stop_DoesNothing:function(){
        var timer = MCAPP.periodicTimer.create();
        timer.start();
        timer.stop();
        assertNull(timer.timer);
        timer.stop();
        assertNull(timer.timer);
    },
    test_Timer_SetInterval_SetsInterval:function() {
        var timer = MCAPP.periodicTimer.create();
        timer.setInterval(123);
        assertEquals(123, timer.interval);
    }
});
