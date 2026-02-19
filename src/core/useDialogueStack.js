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
            const profilePic = "/assets/images/officerpic.png";
            if (e.detail.type === "plot-course") {
              captainText = "Helm, lay in a course for sector " + (e.detail.sector || "2813") + ".";
              helmText = "Aye Captain, course plotted.";
              captainTimeout = 3200;
              helmTimeout = 3200;
            } else if (e.detail.type === "engage") {
              captainText = "Go to Warp Factor 5, Engage.";
              helmText = "Going to warp.";
              captainTimeout = 2600;
              helmTimeout = 2600;
            } else if (e.detail.type === "enhance") {
              captainText = "Enhance image.";
              helmText = undefined;
              let opsText = "Enhancing now, Captain";
              captainTimeout = 2000;
              // Show captain's dialogue
              if (captainText) {
                const id = Date.now() + Math.random();
                setDialogueStack(prev => [...prev, { id, text: captainText, speaker: "CAPTAIN", imageUrl: profilePic }]);
                setTimeout(() => {
                  setDialogueStack(prev => prev.filter(d => d.id !== id));
                }, captainTimeout);
              }
              // Show ops officer's dialogue
              if (opsText) {
                const id = Date.now() + Math.random();
                setTimeout(() => {
                  setDialogueStack(prev => [
                    ...prev,
                    {
                      id,
                      text: opsText,
                      speaker: "OPS",
                      imageUrl: profilePic
                    }
                  ]);
                  setTimeout(() => {
                    setDialogueStack(prev => prev.filter(d => d.id !== id));
                  }, 2000);
                }, 600);
              }
              return;
            } else if (e.detail.type === "photo-album-captain") {
              // Only captain speaks
              captainText = "Visual Records on screen.";
              captainTimeout = 2600; // was 1600
              if (captainText) {
                const id = Date.now() + Math.random();
                setDialogueStack(prev => [...prev, { id, text: captainText, speaker: "CAPTAIN", imageUrl: profilePic }]);
                setTimeout(() => {
                  setDialogueStack(prev => prev.filter(d => d.id !== id));
                }, captainTimeout);
              }
              return;
            } else if (e.detail.type === "photo-album-ops") {
              // Only ops officer speaks
              let opsText = "Displaying now, captain";
              if (opsText) {
                const id = Date.now() + Math.random();
                setDialogueStack(prev => [
                  ...prev,
                  {
                    id,
                    text: opsText,
                    speaker: "OPS",
                    imageUrl: profilePic
                  }
                ]);
                setTimeout(() => {
                  setDialogueStack(prev => prev.filter(d => d.id !== id));
                }, 1700); // was 850
              }
              return;
            } else if (e.detail.type === "github-access") {
              captainText = "Access the Fleet Database.";
              captainTimeout = 1800;
              if (captainText) {
                const id = Date.now() + Math.random();
                setDialogueStack(prev => [...prev, { id, text: captainText, speaker: "CAPTAIN", imageUrl: profilePic }]);
                setTimeout(() => {
                  setDialogueStack(prev => prev.filter(d => d.id !== id));
                }, captainTimeout);
              }
              return;
            } else if (e.detail.type === "github-access-ops") {
              let opsText = "Channel open, captain.";
              if (opsText) {
                const id = Date.now() + Math.random();
                setDialogueStack(prev => [
                  ...prev,
                  {
                    id,
                    text: opsText,
                    speaker: "OPS",
                    imageUrl: profilePic
                  }
                ]);
                setTimeout(() => {
                  setDialogueStack(prev => prev.filter(d => d.id !== id));
                }, 1400);
              }
              return;
            } else if (e.detail.type === "linkedin-access") {
              captainText = "Open a hailing frequency.";
              captainTimeout = 1800;
              if (captainText) {
                const id = Date.now() + Math.random();
                setDialogueStack(prev => [...prev, { id, text: captainText, speaker: "CAPTAIN", imageUrl: profilePic }]);
                setTimeout(() => {
                  setDialogueStack(prev => prev.filter(d => d.id !== id));
                }, captainTimeout);
              }
              return;
            } else if (e.detail.type === "linkedin-access-comms") {
              let commsText = "Hailing frequencies open, captain.";
              if (commsText) {
                const id = Date.now() + Math.random();
                setDialogueStack(prev => [
                  ...prev,
                  {
                    id,
                    text: commsText,
                    speaker: "COMMS",
                    imageUrl: profilePic
                  }
                ]);
                setTimeout(() => {
                  setDialogueStack(prev => prev.filter(d => d.id !== id));
                }, 1400);
              }
              return;
        captainText = "Go to Warp Factor 5, Engage.";
        helmText = "Going to warp.";
        captainTimeout = 2600;
        helmTimeout = 2600;
      } else if (e.detail.type === "enhance") {
        captainText = "Enhance image.";
        helmText = undefined;
        let opsText = "Enhancing now, Captain";
        captainTimeout = 2000;
        // Show captain's dialogue
        if (captainText) {
          const id = Date.now() + Math.random();
          setDialogueStack(prev => [...prev, { id, text: captainText, speaker: "CAPTAIN", imageUrl: profilePic }]);
          setTimeout(() => {
            setDialogueStack(prev => prev.filter(d => d.id !== id));
          }, captainTimeout);
        }
        // Show ops officer's dialogue
        if (opsText) {
          const id = Date.now() + Math.random();
          setTimeout(() => {
            setDialogueStack(prev => [
              ...prev,
              {
                id,
                text: opsText,
                speaker: "OPS",
                imageUrl: profilePic
              }
            ]);
            setTimeout(() => {
              setDialogueStack(prev => prev.filter(d => d.id !== id));
            }, 2000);
          }, 600);
        }
        return;
      } else if (e.detail.type === "photo-album-captain") {
        // Only captain speaks
        captainText = "Visual Records on screen.";
        captainTimeout = 2600; // was 1600
        if (captainText) {
          const id = Date.now() + Math.random();
          setDialogueStack(prev => [...prev, { id, text: captainText, speaker: "CAPTAIN", imageUrl: profilePic }]);
          setTimeout(() => {
            setDialogueStack(prev => prev.filter(d => d.id !== id));
          }, captainTimeout);
        }
        return;
      } else if (e.detail.type === "photo-album-ops") {
        // Only ops officer speaks
        let opsText = "Displaying now, captain";
        if (opsText) {
          const id = Date.now() + Math.random();
          setDialogueStack(prev => [
            ...prev,
            {
              id,
              text: opsText,
              speaker: "OPS",
              imageUrl: profilePic
            }
          ]);
          setTimeout(() => {
            setDialogueStack(prev => prev.filter(d => d.id !== id));
          }, 1700); // was 850
        }
        return;
      }
      if (captainText) {
        const id = Date.now() + Math.random();
        setDialogueStack(prev => [...prev, { id, text: captainText, speaker: "CAPTAIN", imageUrl: profilePic }]);
        setTimeout(() => {
          setDialogueStack(prev => prev.filter(d => d.id !== id));
        }, captainTimeout);
      }
      if (helmText) {
        const id = Date.now() + Math.random();
        setTimeout(() => {
          setDialogueStack(prev => [...prev, { id, text: helmText, speaker: "HELMSMAN", imageUrl: profilePic }]);
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
