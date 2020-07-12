<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
    </div>
    <div class="columns">
      <!-- <hero-detail> -->
      <HeroDetail
        v-if="selectedHero"
        :hero="selectedHero"
        @save="saveHero"
        @cancel="cancelHero"
      />
      <!-- </hero-detail> -->

      <!-- <heroes-list> -->
      <div class="column is-6" v-if="!selectedHero">
        <div class="card edit-detail">
          <header class="card-header">
            <p class="card-header-title">Heroes List</p>
          </header>
          <div class="card-content">
            <ul v-if="!selectedHero">
              <li v-for="hero in heroes" :key="hero.id">
                <div class="card">
                  <div class="card-content">
                    <div class="content">
                      <div :key="hero.name" class="name">
                        {{ hero.firstName }} {{ hero.lastName }}
                      </div>
                      <div class="description">{{ hero.description }}</div>
                    </div>
                  </div>
                  <footer class="card-footer">
                    <button
                      class="link card-footer-item"
                      @click="selectHero(hero)"
                    >
                      <i class="fas fa-check"></i>
                      <span>Select</span>
                    </button>
                  </footer>
                </div>
              </li>
            </ul>
            <!-- <heroes-list> -->
          </div>
        </div>
      </div>
      <!-- </heroes-list> -->
    </div>
  </div>
</template>

<script>
import HeroDetail from '@/components/hero-detail';
import { format } from 'date-fns';
import {
  inputDateFormat,
  lifecycleHooks,
  heroWatchers,
  logger,
} from '../shared';

const heroes = [
  {
    id: 3,
    firstName: 'Tapiwa',
    lastName: 'lason',
    description: 'fire fighter',
    capeCounter: 1,
    capeColor: 'blue',
    originDate: format(new Date(2000, 5, 1), inputDateFormat),
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
    originDate: format(new Date(2010, 7, 11), inputDateFormat),
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
    originDate: format(new Date(2007, 2, 8), inputDateFormat),
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
    originDate: format(new Date(2020, 4, 4), inputDateFormat),
    power: 'Invisibility',
    active: true,
  },
];

export default {
  name: 'Heroes',
  components: { HeroDetail },
  mixins: [lifecycleHooks, heroWatchers],
  data() {
    return {
      selectedHero: null,
      heroes: [],
    };
  },
  methods: {
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
    selectHero(hero) {
      this.selectedHero = hero;
    },
    saveHero(hero) {
      const index = this.heroes.findIndex(h => h.id === hero.id);
      this.heroes.splice(index, 1, hero);
      this.heroes = [...this.heroes];
      this.selectedHero = undefined;
    },
    cancelHero() {
      this.selectedHero = null;
    },
  },
  created() {
    this.loadHeroes();
    logger.info(`${this.componentName} created hook called`);
  },
};
</script>
