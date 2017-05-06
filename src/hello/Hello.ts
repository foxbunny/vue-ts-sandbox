import Vue from "vue"
import {Component} from "vue-property-decorator"

@Component
export default class Hello extends Vue {
  name = "World"

  get displayName() {
    return this.name || "World";
  }

  updateName(e: EventWithTarget) {
    this.name = e.target.value;
  }
}
