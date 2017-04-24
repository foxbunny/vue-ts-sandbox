import Vue from "vue";
import Hello from "./Hello.vue";
import {expect} from "chai";


describe("Hello.vue", () => {
  it("should render without exception", () => {
    const vm = new Vue({
      el: document.createElement("div"),
      render(h) {
        return h(Hello);
      },
    });
    expect(vm.$el.innerHTML).to.be(
      '<p data-v-254f5129="">Hello, World!</p> <input data-v-254f5129="">'
    );
  });

  it("should change the caption when input value changes", (done) => {
    const vm = new Vue({
      el: document.createElement("div"),
      render(h) {
        return h(Hello);
      },
    });

    const input = vm.$el.querySelector("input");
    input.value = "Foo";
    input.dispatchEvent(new Event("input"));

    // After events settle.
    Vue.nextTick(() => {
      expect(vm.$el.innerHTML).to.be(
        '<p data-v-254f5129="">Hello, Foo!</p> <input data-v-254f5129="">'
      )
      done();
    })
  });


  it("should change the caption to default when input is cleared", (done) => {
    const vm = new Vue({
      el: document.createElement("div"),
      render(h) {
        return h(Hello);
      },
    });

    const input = vm.$el.querySelector("input");
    input.value = "";
    input.dispatchEvent(new Event("input"));

    // After events settle.
    Vue.nextTick(() => {
      expect(vm.$el.innerHTML).to.be(
        '<p data-v-254f5129="">Hello, World!</p> <input data-v-254f5129="">'
      )
      done();
    })
  });
});
