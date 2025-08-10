const tasks = [
    { question: "es - schön sein - dich sehen", answer: "Es ist schön, dich zu sehen. / Dich zu sehen, ist schön." },
    { question: "ich - versuchen - dich morgen anrufen", answer: "Ich versuche, dich morgen anzurufen." },
    { question: "er - Angst haben - Fehler machen", answer: "Er hat Angst, Fehler zu machen." },
    { question: "es - teuer sein - im Zentrum wohnen", answer: "Es ist teuer, im Zentrum zu wohnen. / Im Zentrum zu wohnen, ist teuer." },
    { question: "es - nicht leicht sein - eine Arbeit finden", answer: "Es ist nicht leicht, eine Arbeit zu finden. / Eine Arbeit zu finden, ist nicht leicht." },
    { question: "es - verboten sein - hier rauchen", answer: "Es ist verboten, hier zu rauchen. / Hier zu rauchen, ist verboten." },
    { question: "er - hoffen - einen guten Job finden", answer: "Er hofft, einen guten Job zu finden." },
    { question: "ich - mich freuen - Sie kennenlernen", answer: "Ich freue mich, Sie kennenzulernen." },
    { question: "ich - keine Lust haben - aufräumen", answer: "Ich habe keine Lust, aufzuräumen." },
    { question: "es - möglich sein - mit Karte bezahlen", answer: "Es ist möglich, mit Karte zu bezahlen. / Mit Karte zu bezahlen, ist möglich." },
    { question: "ich - keine Zeit haben - ins Fitnessstudio gehen", answer: "Ich habe keine Zeit, ins Fitnessstudio zu gehen." },
    { question: "ich - oft vergessen - die Tür abschließen", answer: "Ich vergesse oft, die Tür abzuschließen." },
    { question: "es - wichtig sein - Fremdsprachen lernen", answer: "Es ist wichtig, Fremdsprachen zu lernen. / Fremdsprachen zu lernen, ist wichtig." },
    { question: "ich - aufhören wollen - so viele Süßigkeiten essen", answer: "Ich will aufhören, so viele Süßigkeiten zu essen." },
    { question: "es - Spaß machen - mit Menschen arbeiten", answer: "Es macht Spaß, mit Menschen zu arbeiten. / Mit Menschen zu arbeiten, macht Spaß." },
    { question: "wir - am Freitag vorhaben - ins Kino gehen", answer: "Wir haben am Freitag vor, ins Kino zu gehen." },
    { question: "ich - es interessant finden - fremde Länder kennenlernen", answer: "Ich finde es interessant, fremde Länder kennenzulernen." },
    { question: "es - manchmal schwer sein - ein Visum bekommen", answer: "Es ist manchmal schwer, ein Visum zu bekommen. / Ein Visum zu bekommen, ist manchmal schwer." }
];



const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        // card.addEventListener("click", () => {
        //     if (!card.classList.contains("flipped")) {
        //         card.classList.add("flipped");
        //     }
        // });


        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });


        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Prevent card flip
            card.classList.add("fade-out"); // fades out a card when you click the "checked" sign

            // Wait for the transition to finish before removing
            setTimeout(() => {
                card.remove();
                checkEnd();
            }, 600); // Match the CSS transition duration
        };


        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}



// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);

// layout toggling logic

const toggleBtn = document.getElementById("toggleLayoutBtn");
let isStacked = false;

toggleBtn.addEventListener("click", () => {
    isStacked = !isStacked;
    container.classList.toggle("stack-mode", isStacked);
    container.classList.toggle("grid-mode", !isStacked);
});

