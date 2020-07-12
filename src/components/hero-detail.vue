<template>
  <div class="column is-6">
    <div class="card edit-detail">
      <header class="card-header">
        <p class="card-header-title">{{ fullName }}</p>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="field">
            <label class="label" for="id">id</label>
            <label class="input" id="id" readonly>{{ clonedHero.id }}</label>
          </div>
          <div class="field">
            <label class="label" for="firstName">first name</label>
            <input
              class="input"
              id="firstName"
              v-model="clonedHero.firstName"
            />
          </div>
          <div class="field">
            <label class="label" for="lastName">last name</label>
            <input class="input" id="lastName" v-model="clonedHero.lastName" />
          </div>
          <div class="field">
            <label class="label" for="description">description</label>
            <textarea
              class="input"
              id="description"
              type="text"
              v-model="clonedHero.description"
            />
          </div>
          <label for="show" class="checkbox">
            show more
            <input
              type="checkbox"
              class="is-primary"
              id="show"
              v-model="showMore"
            />
            <br />
          </label>
          <div v-show="showMore">
            <div class="field">
              <label class="label" for="originDate">origin date</label>
              <input
                class="input"
                id="originDate"
                type="date"
                v-model="clonedHero.originDate"
              />
              <p class="comment">
                My origin story began on
                {{ clonedHero.originDate | shortDate }}
              </p>
            </div>
            <div class="field">
              <label class="label" for="capeCounter">cape counter</label>
              <input
                class="input"
                id="capeCounter"
                type="number"
                min="0"
                v-model="clonedHero.capeCounter"
              />
              <label class="label" id="capeMessage" style="color: #42b883">{{
                capeMessage
              }}</label>
            </div>
            <div class="field">
              <label class="label">cape color</label>
              <label class="radio" for="color-red">
                <input
                  type="radio"
                  id="color-red"
                  value="red"
                  v-model="clonedHero.capeColor"
                />
                red
              </label>
              <label class="radio" for="color-blue">
                <input
                  type="radio"
                  id="color-blue"
                  value="blue"
                  v-model="clonedHero.capeColor"
                />
                blue
              </label>
              <label class="radio" for="color-green">
                <input
                  type="radio"
                  id="color-green"
                  value="green"
                  v-model="clonedHero.capeColor"
                />
                green
              </label>
              <div
                class="color-line"
                :style="{ 'background-color': hero.capeColor }"
              ></div>
            </div>
            <div class="field">
              <label for="power">
                super power
                <div class="select is-primary">
                  <select
                    id="power"
                    v-model="clonedHero.power"
                    :class="{ invalid: !hero.power }"
                    @keyup.esc="clearPower"
                  >
                    <option disabled value>Please select one</option>
                    <option>Speed</option>
                    <option>Flight</option>
                    <option>Strength</option>
                    <option>Invisibility</option>
                  </select>
                </div>
              </label>
            </div>
            <div class="field">
              <label class="checkbox" for="active">
                active
                <input
                  type="checkbox"
                  class="is-primary"
                  id="active"
                  v-model="clonedHero.active"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <button class="link card-footer-item cancel-button" @click="cancelHero">
          <i class="fas fa-undo"></i>
          <span>Cancel</span>
        </button>
        <button class="link card-footer-item" @click="saveHero">
          <i class="fas fa-save"></i>
          <span>Save</span>
        </button>
      </footer>
    </div>
    <div class="notification is-info">
      <pre style="color: black">{{ message }}</pre>
    </div>
  </div>
</template>

<script>
import { parseISO, format } from 'date-fns';
import { lifecycleHooks, displayDateFormat } from '../shared';

export default {
  name: 'HeroDetail',
  mixins: [lifecycleHooks],
  props: {
    hero: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      message: '',
      capeMessage: '',
      showMore: false,
      clonedHero: { ...this.hero },
    };
  },
  methods: {
    cancelHero() {
      this.$emit('cancel');
    },
    saveHero() {
      this.$emit('save', this.clonedHero);
    },
    clearPower() {
      this.clonedHero.power = '';
    },
    handleCapes(newValue) {
      const value = parseInt(newValue, 10);
      switch (value) {
        case 0:
          this.capeMessage = 'Where is my cape?';
          break;
        case 1:
          this.capeMessage = 'One is all I need';
          break;
        case 2:
          this.capeMessage = 'Alway have a spare';
          break;
        default:
          this.capeMessage = 'You can never have enough capes';
          break;
      }
    },
  },
  computed: {
    fullName() {
      return `${this.clonedHero.firstName} ${this.clonedHero.lastName}`;
    },
  },

  watch: {
    'clonedHero.capeCounter': {
      immediate: true,
      handler(newVal) {
        this.handleCapes(newVal);
      },
    },
  },
  filters: {
    shortDate: val => {
      return format(parseISO(val), displayDateFormat);
    },
  },
};
</script>
