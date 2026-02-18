import React from 'react';

// Handles captain-speech events and manages dialogue stack
export function useDialogueStack(captainImage, helmImage) {
  const [dialogueStack, setDialogueStack] = React.useState([]);

  React.useEffect(() => {
    function handleSpeechEvent(e) {
      if (!e.detail || !e.detail.type) return;
      let captainText = "";
      let helmText = "";
      let captainTimeout = 2500;
      let helmTimeout = 2500;
      if (e.detail.type === "plot-course") {
        captainText = "Helm, lay in a course for sector " + (e.detail.sector || "2813") + ".";
        helmText = "Aye Captain, course plotted.";
        captainTimeout = 3200;
        helmTimeout = 3200;
      } else if (e.detail.type === "engage") {
        captainText = "Engage.";
        helmText = "Going to warp.";
        captainTimeout = 2600;
        helmTimeout = 2600;
      }
      if (captainText) {
        const id = Date.now() + Math.random();
        setDialogueStack(prev => [...prev, { id, text: captainText, speaker: "CAPTAIN", imageUrl: captainImage }]);
        setTimeout(() => {
          setDialogueStack(prev => prev.filter(d => d.id !== id));
        }, captainTimeout);
      }
      if (helmText) {
        const id = Date.now() + Math.random();
        setTimeout(() => {
          setDialogueStack(prev => [...prev, { id, text: helmText, speaker: "HELMSMAN", imageUrl: helmImage }]);
          setTimeout(() => {
            setDialogueStack(prev => prev.filter(d => d.id !== id));
          }, helmTimeout);
        }, 600);
      }
    }
    window.addEventListener("captain-speech", handleSpeechEvent);
    return () => window.removeEventListener("captain-speech", handleSpeechEvent);
  }, [captainImage, helmImage]);

  return [dialogueStack, setDialogueStack];
}
