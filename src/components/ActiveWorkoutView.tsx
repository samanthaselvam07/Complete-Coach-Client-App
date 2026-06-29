import React, { useState, useEffect } from 'react';
import { ScreenType, SetLog } from '../types';

interface ActiveWorkoutViewProps {
  onNavigate: (screen: ScreenType) => void;
  onFinishWorkout: (intensity: number, notes: string) => void;
}

export default function ActiveWorkoutView({
  onNavigate,
  onFinishWorkout
}: ActiveWorkoutViewProps) {
  // Timer state
  const [seconds, setSeconds] = useState<number>(2535); // Initialized to 42:15
  const [timerActive, setTimerActive] = useState<boolean>(true);

  // Rest Timer state
  const [restSeconds, setRestSeconds] = useState<number>(102); // 1:42
  const [restActive, setRestActive] = useState<boolean>(true);

  // Logging Set row states
  const [setLogs, setSetLogs] = useState<SetLog[]>([
    { setNumber: 1, lbs: 185, reps: 8, rpe: 8, done: true },
    { setNumber: 2, lbs: 185, reps: 8, rpe: '', done: false },
    { setNumber: 3, lbs: '', reps: '', rpe: '', done: false }
  ]);

  // Modal toggle
  const [showFinishModal, setShowFinishModal] = useState<boolean>(false);
  const [selectedIntensity, setSelectedIntensity] = useState<number>(8);
  const [sessionNotes, setSessionNotes] = useState<string>('');

  // Workout duration timer tick
  useEffect(() => {
    let interval: any = null;
    if (timerActive) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // Rest Timer tick
  useEffect(() => {
    let interval: any = null;
    if (restActive && restSeconds > 0) {
      interval = setInterval(() => {
        setRestSeconds(prev => prev - 1);
      }, 1000);
    } else if (restSeconds === 0) {
      setRestActive(false);
    }
    return () => clearInterval(interval);
  }, [restActive, restSeconds]);

  // Formats seconds into MM:SS
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleDone = (index: number) => {
    setSetLogs(prev => prev.map((set, i) => {
      if (i === index) {
        // If transitioning to done, let's trigger rest timer reset!
        if (!set.done) {
          setRestSeconds(90); // reset rest to 1:30
          setRestActive(true);
        }
        return { ...set, done: !set.done };
      }
      return set;
    }));
  };

  const handleInputChange = (index: number, field: 'lbs' | 'reps' | 'rpe', value: string) => {
    const numericVal = value === '' ? '' : parseInt(value) || 0;
    setSetLogs(prev => prev.map((set, i) => {
      if (i === index) {
        return { ...set, [field]: numericVal };
      }
      return set;
    }));
  };

  const handleAddSet = () => {
    const lastSet = setLogs[setLogs.length - 1];
    const newSetNumber = setLogs.length + 1;
    setSetLogs(prev => [
      ...prev,
      {
        setNumber: newSetNumber,
        lbs: lastSet?.lbs || '',
        reps: lastSet?.reps || '',
        rpe: '',
        done: false
      }
    ]);
  };

  const handleSaveAndFinish = () => {
    onFinishWorkout(selectedIntensity, sessionNotes);
    setShowFinishModal(false);
    onNavigate('analytics');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-32">
      {/* Timer Dashboard Grid */}
      <section className="grid grid-cols-2 gap-4">
        {/* Workout duration */}
        <div className="col-span-2 bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(27,28,28,0.06)] border border-zinc-100 flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
              Workout Duration
            </span>
            <div className="text-5xl font-black tracking-tighter text-zinc-800 font-headline">
              {formatTime(seconds)}
            </div>
          </div>
          <button 
            type="button"
            onClick={() => setTimerActive(!timerActive)}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
              timerActive ? 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200' : 'bg-primary text-white'
            }`}
          >
            <span className="material-symbols-outlined text-xl font-bold">
              {timerActive ? 'pause' : 'play_arrow'}
            </span>
          </button>
        </div>

        {/* Rest Timer */}
        <div className="col-span-2 bg-white/50 backdrop-blur-md rounded-3xl p-5 border border-zinc-100 flex items-center justify-between shadow-sm">
          <div className="space-y-0.5">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              Rest Timer
            </p>
            <p className={`text-2xl font-extrabold font-headline ${restSeconds === 0 ? 'text-zinc-400' : 'text-primary'}`}>
              {formatTime(restSeconds)}
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              type="button"
              onClick={() => {
                setRestSeconds(90); // Reset to 1:30
                setRestActive(true);
              }}
              className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 active:scale-90 hover:bg-zinc-200 transition-transform"
            >
              <span className="material-symbols-outlined text-lg">replay</span>
            </button>
            <button 
              type="button"
              onClick={() => setRestActive(!restActive)}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-lg font-bold">
                {restActive ? 'pause' : 'play_arrow'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Current Exercise logger card */}
      <section className="bg-zinc-50 rounded-3xl overflow-hidden border border-zinc-100 shadow-sm">
        {/* Banner */}
        <div className="relative h-40">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjq_BZ5xOGFROzeyGRNaNJdfNwaqC0fbVJA2lU4W4YJ04vH_Oy6Y5IwrfG1V46vF_dwRXNIvVfBAN7xHlJDEFT3v5j-qovkDHKFjqWNlgH8IavBXh2Px90SkTS7HHYPtBo0K-L8_Hc5ltMFWSs0rulWCiL1A-oOTVNZ6bHBjbOjx2buLzvn16XXH-u3cbzmsQR-lVU22ND4nbhOIdNs6euBs-1VYpZ1PzbE5qlE-6L_PpqozuAqRnvAgu7bUS0CVsDslZ4XVZEKeQ" 
            alt="Barbell Incline Bench Press" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent flex items-end p-6" />
          <div className="absolute bottom-4 left-6">
            <span className="bg-secondary-container text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Target: Chest
            </span>
            <h2 className="text-white text-2xl font-black font-headline mt-1.5">
              Barbell Incline Bench Press
            </h2>
          </div>
        </div>

        {/* Logger table content */}
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-5 gap-2 px-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            <div className="col-span-1 text-center">Set</div>
            <div className="col-span-1">Lbs</div>
            <div className="col-span-1">Reps</div>
            <div className="col-span-1">RPE</div>
            <div className="col-span-1 text-right">Done</div>
          </div>

          <div className="space-y-3">
            {setLogs.map((set, index) => (
              <div 
                key={set.setNumber}
                className={`grid grid-cols-5 gap-2 items-center bg-white p-3 rounded-2xl shadow-sm border transition-all ${
                  set.done ? 'border-zinc-200/60 opacity-60' : 'border-primary/10'
                }`}
              >
                <div className="col-span-1 text-center font-extrabold text-zinc-400 font-headline">
                  {set.setNumber}
                </div>
                
                {/* Lbs input */}
                <input 
                  type="number"
                  className="col-span-1 bg-zinc-100 border-none rounded-xl text-center font-extrabold py-2 px-1 focus:ring-2 focus:ring-primary/20 text-zinc-800 text-sm"
                  value={set.lbs}
                  onChange={(e) => handleInputChange(index, 'lbs', e.target.value)}
                  placeholder="185"
                  disabled={set.done}
                />

                {/* Reps input */}
                <input 
                  type="number"
                  className="col-span-1 bg-zinc-100 border-none rounded-xl text-center font-extrabold py-2 px-1 focus:ring-2 focus:ring-primary/20 text-zinc-800 text-sm"
                  value={set.reps}
                  onChange={(e) => handleInputChange(index, 'reps', e.target.value)}
                  placeholder="8"
                  disabled={set.done}
                />

                {/* RPE input */}
                <input 
                  type="number"
                  className="col-span-1 bg-zinc-100 border-none rounded-xl text-center font-extrabold py-2 px-1 focus:ring-2 focus:ring-primary/20 text-zinc-800 text-sm"
                  value={set.rpe}
                  onChange={(e) => handleInputChange(index, 'rpe', e.target.value)}
                  placeholder="8"
                  disabled={set.done}
                />

                {/* Done checkmark action */}
                <div className="col-span-1 flex justify-end">
                  <button 
                    type="button"
                    onClick={() => handleToggleDone(index)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
                      set.done 
                        ? 'bg-secondary-container text-white shadow-secondary-container/20' 
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-400 shadow-none'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm font-bold">
                      check
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            type="button"
            onClick={handleAddSet}
            className="w-full py-3.5 rounded-2xl border-2 border-dashed border-zinc-200 text-zinc-400 font-bold text-sm hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
          >
            + Add Set
          </button>
        </div>
      </section>

      {/* Up Next Preview box */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
            Up Next
          </h3>
          <span className="text-[10px] text-primary font-bold">2 / 6 Exercises</span>
        </div>

        <div className="bg-white/80 border border-zinc-100 p-3 rounded-2xl flex items-center gap-4 shadow-sm group active:scale-[0.98] transition-transform cursor-pointer">
          <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-zinc-200/50">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb2ElypnOGTXOIr_MDRqWjG4tttyfcpLmiAVIUlj78lNaQJ9rlGw3PwqRXMmT0rKwj19TeobijgCBPIsx5j2ucg1QoHw4s063Q6n8LMjz75oqITPvbhRHbIT-W-x-TzpLH007BqIS5qO2VKdcFFW4M8S26KYzDduDnY9_xBH8AxHoWvv6pa3SVSLZ5kGsao84VVRx2ymdHmb2w2p7bLbC__umj3z9SWb_EH1FzeduPuXSD7vu8QwqPBNLuNY7R7xgZAibzBwJIjDQ" 
              alt="Weighted Pull Ups" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-grow">
            <p className="text-sm font-bold text-zinc-800">Weighted Pull Ups</p>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">4 Sets • Target: Latissimus Dorsi</p>
          </div>
          <span className="material-symbols-outlined text-zinc-300 group-hover:text-primary transition-colors">
            chevron_right
          </span>
        </div>
      </section>

      {/* Fixed Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent z-40">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <button 
            type="button"
            className="flex-shrink-0 w-16 h-16 rounded-3xl bg-white border border-zinc-100 shadow-lg flex items-center justify-center text-zinc-600 active:scale-95 transition-transform hover:bg-zinc-50"
          >
            <span className="material-symbols-outlined font-bold text-xl">list_alt</span>
          </button>
          
          <button 
            type="button"
            onClick={() => {
              setTimerActive(false);
              setRestActive(false);
              setShowFinishModal(true);
            }}
            className="flex-grow h-16 rounded-3xl bg-gradient-to-br from-primary to-primary-container text-white font-black font-headline text-lg tracking-tight shadow-[0_20px_50px_rgba(54,32,184,0.3)] flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            Finish Session
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              flag
            </span>
          </button>
        </div>
      </div>

      {/* Congratulations / Finish session modal */}
      {showFinishModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-md w-full max-w-sm rounded-3xl border border-zinc-100 shadow-2xl overflow-hidden animate-fade-in">
            <div className="p-8 space-y-6">
              <div className="text-center space-y-1">
                <span className="material-symbols-outlined text-primary text-5xl animate-bounce block" style={{ fontVariationSettings: "'FILL' 1" }}>
                  celebration
                </span>
                <h2 className="text-3xl font-black font-headline tracking-tight text-zinc-900">
                  Workout Complete!
                </h2>
                <p className="text-zinc-500 text-sm font-semibold">
                  You've crushed today's session.
                </p>
              </div>

              {/* Rate intensity */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block font-headline">
                  Rate your Session Intensity
                </label>
                <div className="flex justify-between gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button 
                      key={num}
                      type="button"
                      onClick={() => setSelectedIntensity(num)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] font-black flex items-center justify-center transition-all ${
                        selectedIntensity === num 
                          ? 'bg-primary text-white scale-110 shadow-md shadow-primary/20' 
                          : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block font-headline">
                  Session Notes
                </label>
                <textarea 
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 text-sm font-medium placeholder:text-zinc-400 min-h-[100px] resize-none focus:ring-2 focus:ring-primary/20"
                  placeholder="How did you feel? Any wins or struggles today?"
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                />
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-2">
                <button 
                  type="button"
                  onClick={handleSaveAndFinish}
                  className="w-full h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-white font-black font-headline text-lg tracking-tight shadow-lg shadow-primary/20 active:scale-95 transition-transform"
                >
                  Save &amp; Finish
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowFinishModal(false);
                    setTimerActive(true);
                  }}
                  className="w-full h-12 rounded-2xl text-zinc-400 hover:text-zinc-600 font-bold text-sm transition-colors"
                >
                  Back to Workout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
