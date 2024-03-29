    const ANIMATION_HEIGHT = 20;
    const ANIMATION_DELAY = 50;
    const DELAY_BETWEEN_ITEMS = 100;
    let animations = [];

    function startAnimations() {
        cancelAnimations();
        var container = document.getElementById("container");
        const spans = container.querySelectorAll(".item");
        let i = 0;
        for (const span of spans) {
            const timer = setTimeout(() => {
                animations.push(jumpSpan(span));
            }, i * DELAY_BETWEEN_ITEMS);
            i++;
            animations.push(timer);
        }
    }

    function cancelAnimations() {
        animations.forEach(a => clearInterval(a));
        animations = [];
    }

    function flipAnimation(keepCurrent) {
        var animation = document.getElementById("action");
        if ((!keepCurrent && animation.innerText === 'Start') || (keepCurrent && animation.innerText === 'Stop')) {
            animation.innerText = "Stop";
            startAnimations();
        } else {
            animation.innerText = 'Start';
            cancelAnimations();
        }
    }

    function jumpSpan(span) {
        let direction = -1;
        return setInterval(() => {
            const top = parseInt(span.style.top) || 0;
            if (Math.abs(top) > ANIMATION_HEIGHT) {
                direction *= -1;
            }
            span.style.top = `${top + direction}px`;
        }, ANIMATION_DELAY);
    }

    function generateTextToAnimate() {
        const text = document.getElementById("textinput").value;
        const breakByWords = document.getElementById("words").checked;
        const animate = document.getElementById("action").innerText === "Stop";

        var container = document.getElementById("container");
        container.innerHTML = "";

        var graphemeSegmenter = new Intl["Segmenter"]("en", { "granularity": breakByWords ? "word" : "grapheme" });
        var graphemes = graphemeSegmenter.segment(text);
        var everySecondItem = true;
        for (const grapheme of graphemes) {
            const from = grapheme["index"];
            const to = from + grapheme["segment"]["length"];
            var span = document.createElement("span");
            span.classList.add("item");
            span.style.background = everySecondItem ? "green" : "red";
            if (breakByWords) {
                span.style.wordBreak = "keep-all";
            }
            span.innerText = text.substring(from, to);
            container.appendChild(span);
            everySecondItem = !everySecondItem;
        }
        flipAnimation(true);
    }