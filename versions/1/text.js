    function getShapingInfo() {
        const text = document.getElementById("textinput").value;
        const div = document.getElementById("d");
        div.innerHTML = "";
        const breakByWords = document.getElementById("words").checked;
        var graphemeSegmenter = new Intl["Segmenter"]("en", { "granularity": breakByWords ? "word" : "grapheme" });
        var graphemes = graphemeSegmenter.segment(text);
        for (const grapheme of graphemes) {
            const from = grapheme["index"];
            const to = from + grapheme["segment"]["length"];
            var span = document.createElement("span");
            if (breakByWords) {
                span.style.wordBreak = "keep-all";
            }
            span.innerText = text.substring(from, to);
            div.appendChild(span);
        }
    }
    function drawText(context, div, timeStamp) {
        var index = 0;
        for (const child of div.children) {
            const rects = child.getClientRects();
            for (const rect of rects) {
                context.save();
                context.fillStyle = `hsl(216, ${77 * index/div.children.length}%, ${58 * index/div.children.length}%)`;
                context.translate(rect.left + rect.width/2, rect.top + 50);
                context.rotate(Math.cos((timeStamp + rect.left) / 100.0) / 16.0);
                context.translate( - rect.width / 2, - 50);
                context.fillText(child.innerHTML, 0, 0);
                context.restore();
            }
            index += 1;
        }
    }

    function updateCanvas() {
        var canvas = document.getElementById("c");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'absolute';
        canvas.style.left = 0;
        canvas.style.top = 200;
        canvas.style.zIndex = 100000;
        canvas.style.pointerEvents = 'none';
    }

    function step(timeStamp) {
        try {
            var canvas = document.getElementById("c");
            const style_font_size = "100px";
            const style_font = "Raleway";
            var context = canvas.getContext('2d');
            context.fillStyle = "gray";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font = "600 " + style_font_size + " " + style_font;
            context.textBaseline = "top";
            context.textAlign = "left";
            context.save();
            const div = document.getElementById("d");
            drawText(context, div, timeStamp);
            context.restore();
        }
        catch {
            console.log('something went wrong');
        }
        window.requestAnimationFrame(step);
    }

    function animateText() {
        window.requestAnimationFrame(step);
    }