
const arr = [];

function create_NEW_ELEM(x, y, type) {
    const store_round = document.createElement("div");
    store_round.classList.add(type);
    store_round.style.left = `${x}px`;
    store_round.style.top = `${y}px`;
    document.querySelector(".container").appendChild(store_round);
    arr.push({
        element: store_round,
        x,
        y,
        type,
        xVelocity: Math.random() * 10 - 5,
        yVelocity: Math.random() * 10 - 5,
    });
}

function update() {
    if (all_objects_simil()) {
        reset();
    }
    arr.forEach(element => {
        element.x += element.xVelocity;
        element.y += element.yVelocity;

        if (element.x < 0 || element.x + element.element.offsetWidth > window.innerWidth) {
            element.xVelocity *= -1;
        }
        if (element.y < 0 || element.y + element.element.offsetHeight > window.innerHeight) {
            element.yVelocity *= -1;
        }

        arr.forEach(otherElement => {
            if (element !== otherElement && does_collide(element, otherElement)) {
                if (element.type === "rock" && otherElement.type === "scissors") {
                    otherElement.type = "rock";
                    otherElement.element.classList.remove("scissors");
                    otherElement.element.classList.add("rock");
                } else if (element.type === "scissors" && otherElement.type === "paper") {
                    otherElement.type = "scissors";
                    otherElement.element.classList.remove("paper");
                    otherElement.element.classList.add("scissors");
                } else if (element.type === "paper" && otherElement.type === "rock") {
                    otherElement.type = "paper";
                    otherElement.element.classList.remove("rock");
                    otherElement.element.classList.add("paper");
                } else if (element.type === otherElement.type) {
                    otherElement.type = element.type;
                    otherElement.element.classList.remove(otherElement.type);
                    otherElement.element.classList.add(element.type);
                    element.xVelocity *= 1;
                    element.yVelocity *= 1;
                    otherElement.xVelocity *= 1;
                    otherElement.yVelocity *= 1;
                } else {
                    element.xVelocity *= -1;
                    element.yVelocity *= -1;
                    otherElement.xVelocity *= -1;
                    otherElement.yVelocity *= -1;
                }
            }
        });
    });

    arr.forEach(element => {
        element.element.style.left = `${element.x}px`;
        element.element.style.top = `${element.y}px`;
    });

    window.requestAnimationFrame(update);
}

function does_collide(element1, element2) {
    const rect1 = element1.element.getBoundingClientRect();
    const rect2 = element2.element.getBoundingClientRect();
    return (
        rect1.x <= rect2.x + rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y <= rect2.y + rect2.height &&
        rect1.y + rect1.height >= rect2.y
    );
}

for (let i = 0; i < 17; i++) {
    create_NEW_ELEM(Math.random() * window.innerWidth, Math.random() * window.innerHeight, "rock");
    create_NEW_ELEM(Math.random() * window.innerWidth, Math.random() * window.innerHeight, "scissors");
    create_NEW_ELEM(Math.random() * window.innerWidth, Math.random() * window.innerHeight, "paper");
}


window.requestAnimationFrame(update);

function reset() {
    arr.forEach(element => {
        element.element.remove();
    });
    arr.length = 0;

    for (let i = 0; i < 17; i++) {
        create_NEW_ELEM(Math.random() * window.innerWidth, Math.random() * window.innerHeight, "rock");
        create_NEW_ELEM(Math.random() * window.innerWidth, Math.random() * window.innerHeight, "scissors");
        create_NEW_ELEM(Math.random() * window.innerWidth, Math.random() * window.innerHeight, "paper");
    }
}

function all_objects_simil() {
    return arr.every(element => element.type === arr[0].type);
}
