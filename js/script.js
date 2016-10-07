(function () {
    /*
     Timer
     */

    var utils = {
        find: document.querySelector.bind(document),
        addEvent: function (event, fn) {
            var args = arguments;
            addEventListener(event, fn, false);
            return arguments;
        },
        rmEvent: function (event, fn) {
            removeEventListener(event, fn);
        }
    };

    var timeContainer = utils.find(".time-result");
    var photoContainer = utils.find(".photo");

    function startTime(elem) {
        var start = new Date().getTime(),
            elapsed = '0.0';

        return setInterval(function () {
            var time = new Date().getTime() - start;

            elapsed = Math.floor(time / 100) / 10;
            if (Math.round(elapsed) == elapsed) {
                elapsed += '.0';
            }

            elem.textContent = elapsed;

        }, 50);
    }

    var time = startTime(timeContainer);

    function processImg(i, params) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.src = "./img/" + i + ".png";
            img.style.position = "absolute";
            var args = utils.addEvent("load", function () {
                img.style.top = (getRandom(params.h) - img.height / 2) + "px";
                img.style.left = (getRandom(params.w) - img.width / 2) + "px";
                resolve(img);
                utils.rmEvent(args);
            });
        });
    }

    function getRandom(num) {
        return Math.floor(Math.random() * num);
    }

//    Create image filler
    function imagesFiller(count) {
        var dimensions = photoContainer.getBoundingClientRect();
        var params = {
            w: dimensions.width,
            h: dimensions.height
        };
        var resultOfPromises = [];
        for (var i = 1; i <= count; i++) {
            resultOfPromises.push(processImg(i, params));
        }
        return resultOfPromises;
    }

    function injectImages() {
        return Promise.all(imagesFiller(7)).then(function (images) {
            images.forEach(function (img) {
                console.log(img.width, img.height);
                photoContainer.appendChild(img);
            });
        }).catch(function (err) {
            console.log(err);
        });
    }

    function fuckFilling(num) {
        for (var i = 0; i < num; i++) {
            injectImages();
        }
    }

    fuckFilling(23);


}());