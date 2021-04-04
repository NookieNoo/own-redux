import { store, increment, decrement } from "./store";
import { createWrappedButton, createDiv } from "./dom";
const firstComponentRoot = document.getElementById("root1");
const secondComponentRoot = document.getElementById("root2");
console.log("firstComponentRoot", firstComponentRoot); // ??
console.log(
  "firstComponentRoot.children.length",
  firstComponentRoot.children.length
);

function firstComponentRender(unsubscribe) {
  if (!firstComponentRoot.children.length) {
    firstComponentRoot.appendChild(createDiv(store.getState()));
    firstComponentRoot.appendChild(createWrappedButton("increment", increment));
    firstComponentRoot.appendChild(createWrappedButton("decrement", decrement));
    firstComponentRoot.appendChild(
      createWrappedButton("unsubscribe", unsubscribe)
    );
  } else {
    firstComponentRoot.children[0].innerHTML = store.getState();
  }
}

function secondComponentRender(unsubscribe) {
  if (!secondComponentRoot.children.length) {
    secondComponentRoot.appendChild(createDiv(store.getState()));
    secondComponentRoot.appendChild(
      createWrappedButton("unsubscribe", unsubscribe)
    );
  } else {
    secondComponentRoot.children[0].innerHTML = store.getState();
  }
}

const firstComponentUnsubscribe = store.subscribe(() => {
  firstComponentRender(firstComponentUnsubscribe);
});
const secondComponentUnsubscribe = store.subscribe(() =>
  secondComponentRender(secondComponentUnsubscribe)
);

firstComponentRender(firstComponentUnsubscribe);
secondComponentRender(secondComponentUnsubscribe);
