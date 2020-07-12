<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
    </div>
    <div class="columns">
      <div class="column is-4">
        <div class="card edit-detail" v-if="selectedHero">
          <header class="card-header">
            <p class="card-header-title">{{ fullName }}</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="field">
                <label class="label" for="id">id</label>
                <label class="input" id="id" readonly>{{
                  selectedHero.id
                }}</label>
              </div>
              <div class="field">
                <label class="label" for="firstName">first name</label>
                <input
                  class="input"
                  id="firstName"
                  v-model="selectedHero.firstName"
                />
              </div>
              <div class="field">
                <label class="label" for="lastName">last name</label>
                <input
                  class="input"
                  id="lastName"
                  v-model="selectedHero.lastName"
                />
              </div>
              <div class="field">
                <label class="label" for="description">description</label>
                <textarea
                  class="input"
                  id="description"
                  type="text"
                  v-model="selectedHero.description"
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
                  <label class="label" for="capeCounter">cape counter</label>
                  <input
                    class="input"
                    id="capeCounter"
                    type="number"
                    min="0"
                    v-model="selectedHero.capeCounter"
                  />
                  <label
                    class="label"
                    id="capeMessage"
                    style="color: #42b883"
                    >{{ capeMessage }}</label
                  >
                </div>
                <div class="field">
                  <label class="label">cape color</label>
                  <label class="radio" for="color-red">
                    <input
                      type="radio"
                      id="color-red"
                      value="red"
                      v-model="selectedHero.capeColor"
                    />
                    red
                  </label>
                  <label class="radio" for="color-blue">
                    <input
                      type="radio"
                      id="color-blue"
                      value="blue"
                      v-model="selectedHero.capeColor"
                    />
                    blue
                  </label>
                  <label class="radio" for="color-green">
                    <input
                      type="radio"
                      id="color-green"
                      value="green"
                      v-model="selectedHero.capeColor"
                    />
                    green
                  </label>
                  <div
                    class="color-line"
                    :style="{ 'background-color': selectedHero.capeColor }"
                  ></div>
                </div>
                <div class="field">
                  <label for="power">
                    super power
                    <div class="select is-primary">
                      <select
                        id="power"
                        v-model="selectedHero.power"
                        :class="{ invalid: !selectedHero.power }"
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
                      v-model="selectedHero.active"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <button
              class="link card-footer-item cancel-button"
              @click="cancelHero"
            >
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
      <div class="column is-1"></div>
      <div class="column is-6">
        <div class="card edit-detail">
          <header class="card-header">
            <p class="card-header-title">Heroes List</p>
          </header>
          <div class="card-content">
            <ul class="list is-hoverable">
              <li v-for="hero in heroes" :key="hero.id">
                <a
                  class="list-item"
                  :class="{ 'is-active': selectedHero === hero }"
                  @click="selectedHero = hero"
                >
                  <span>{{ hero.firstName }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const heroes = [
  {
    id: 3,
    firstName: 'Tapiwa',
    lastName: 'lason',
    description: 'fire fighter',
    capeCounter: 1,
    capeColor: 'blue',
    power: 'Strength',
    active: true,
  },
  {
    id: 20,
    firstName: 'John',
    lastName: 'Stockton',
    description: 'the cat whisperer',
    capeCounter: 4,
    capeColor: 'blue',
    power: 'Speed',
    active: true,
  },
  {
    id: 30,
    firstName: 'Karl',
    lastName: 'Malone',
    description: 'pen wielder',
    capeCounter: 0,
    capeColor: 'red',
    power: 'Strength',
    active: false,
  },
  {
    id: 40,
    firstName: 'Larry',
    lastName: 'Bird',
    description: 'arc trooper',
    capeCounter: 2,
    capeColor: 'green',
    power: 'Invisibility',
    active: true,
  },
];
export default {
  name: 'Heroes',
  data() {
    return {
      message: '',
      capeMessage: '',
      selectedHero: null,
      showMore: false,
      heroes: [],
    };
  },
  methods: {
    cancelHero() {
      this.message = '';
    },
    saveHero() {
      this.message = JSON.stringify(this.selectedHero, null, '\n');
    },
    clearPower() {
      this.selectedHero.power = '';
    },
    async getHeroes() {
      return new Promise(resolve => {
        setTimeout(() => resolve(heroes), 1500);
      });
    },
    async loadHeroes() {
      this.heroes = [];
      this.message = 'Getting heroes, please wait...';
      this.heroes = await this.getHeroes();
      this.message = '';
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
      return `${this.selectedHero.firstName} ${this.selectedHero.lastName}`;
    },
  },
  created() {
    this.loadHeroes();
  },
  watch: {
    'selectedHero.capeCounter': {
      immediate: true,
      handler(newVal) {
        this.handleCapes(newVal);
      },
    },
  },
};
</script>
