import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Hello extends Vue {
  name = "World";

  get displayName() {
    return this.name || "World";
  }

  updateName(e: Event) {
    const target = e.target as HTMLInputElement;
    this.name = target.value;
  }
}
