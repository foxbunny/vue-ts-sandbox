import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Hello extends Vue {
  name = "World";

  get displayName() {
    return this.name || "World";
  }
}
