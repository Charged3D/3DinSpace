document.addEventListener("DOMContentLoaded", () => {
    const introContainer = document.getElementById("intro-container");
    const videoContainer = document.getElementById("video-container");
    const textContainer = document.getElementById("text-container");
    const videoElement = document.getElementById("video-player");
    const nextButton = document.getElementById("next-button");
    const startButton = document.getElementById("start-button");


    const scenes = [
        { video: "scene1.mp4", class: "right-side", text: "На космічних станціях, таких як Міжнародна космічна станція (МКС), забезпечення всім необхідним здійснюється через складний логістичний ланцюг. Доставка запчастин, обладнання та ресурсів з Землі вимагає багато часу та значних витрат. Кожна місія потребує планування з високим ступенем точності, щоб мінімізувати затримки та забезпечити роботу всіх систем. Крім того, існують ризики, пов'язані зі станом космічних апаратів під час польоту, що ще більше ускладнює завдання забезпечення належного функціонування станції." },
        { video: "scene2.mp4", class: "left-side", text: "3D-принтери надають можливість виготовляти будь-які необхідні деталі на місці. Це мінімізує витрати, пов'язані з доставкою, та дозволяє пришвидшити процеси обслуговування космічних станцій." },
        { video: "scene3.mp4", class: "left-side-bottom", text: "Використання 3D-принтерів для створення механізмів, таких як болти, гайки та інші деталі, які мають критичне значення для підтримки функціонування космічних станцій та систем життєзабезпечення." },
        { video: "scene4.mp4", class: "bottom-center", text: "Місячні бази потребують захисту від метеоритів, космічної радіації та екстремальних температур. 3D-друк дозволяє виготовляти міцні металеві оболонки для таких станцій, які забезпечують надійний захист і функціональність." },
        { video: "scene5.mp4", class: "top-center", text: "Лунний ґрунт використовується роботами-принтерами для створення додаткового захисту та будівельних матеріалів. Цей метод допомагає забезпечити довговічний захист та адаптацію на Місяці." },
        { video: "scene6.mp4", class: "center", text: "3D-друк відкриває величезні перспективи для майбутніх космічних місій. Завдяки цій технології стає можливим швидке виготовлення потрібних ресурсів, інженерних деталей та інфраструктурних елементів безпосередньо у космосі." },
        { video: "scene7.mp4", class: "", text: "" }, // 7-ма сцена без тексту
    ];

    let currentScene = 0;

    function startPresentation() {
        const introText = document.querySelector("#intro-container .text-container");
        introText.classList.remove("visible"); // Приховує текст після натискання кнопки
    
        introContainer.style.display = "none"; // Приховує контейнер
        videoContainer.style.display = "block"; // Показує відео
        setScene(currentScene); // Запускає першу сцену
    }

    function setScene(index) {
        if (index >= scenes.length) {
            showIntro();
            return;
        }


        
        const scene = scenes[index];
        videoElement.src = scene.video;
        videoElement.load();

        textContainer.classList.remove("bottom-center", "right-side", "top-center", "left-side", "left-side-bottom", "center");
        if (scene.class) {
            textContainer.classList.add(scene.class);
        }

        textContainer.classList.remove("visible");
        textContainer.textContent = "";
        nextButton.style.display = "none";

        videoElement.addEventListener("loadeddata", () => {
            videoElement.play().catch((err) => console.error("Помилка програвання відео:", err));
        });

        videoElement.addEventListener("timeupdate", handleTimeUpdate);
    }

    function handleTimeUpdate() {
        if (videoElement.duration - videoElement.currentTime <= 1) {
            showTextForScene(currentScene);
        }
    }

    function showTextForScene(index) {
        const scene = scenes[index];
        if (scene.text) {
            textContainer.textContent = scene.text;
            textContainer.classList.add("visible");
        }

        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        videoElement.addEventListener("ended", prepareNextScene);
    }

    function prepareNextScene() {
        videoElement.removeEventListener("ended", prepareNextScene);
        currentScene++;

        if (currentScene < scenes.length) {
            nextButton.style.display = "block";
        } else {
            showIntro(); // Повернення до інтро після останньої сцени
        }
    }

    function showIntro() {
        videoContainer.style.display = "none";
        introContainer.style.display = "block";
        startButton.textContent = "Почати";
        currentScene = 0; // Повернення до початку
    }

    nextButton.addEventListener("click", () => {
        setScene(currentScene);
    });

    startButton.addEventListener("click", startPresentation);
});
