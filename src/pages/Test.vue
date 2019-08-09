<template>

    <v-container fluid grid-list-xl>
        <v-layout row wrap justify-center>
            <v-flex xs12 md6>

                <v-card>

                    <engine
                        @loading-state="loadingStateUpdate"
                        @loaded="loaded"
                        @click="engineClick"
                        :layers="layers"
                    ></engine>

                </v-card>

            </v-flex>

            <v-flex xs12 md6>

                <v-layout column>
                    <v-flex>
                        <v-card>

                            <v-card-title class="headline justify-space-between">
                                Layer

                                <small v-if="selectedLayer">
                                    {{ selectedLayer.name }}
                                </small>
                            </v-card-title>

                            <v-list v-if="layers">
                                <v-list-item-group v-model="selectedLayerIndex" color="primary">
                                    <v-list-item v-for="(layer, index) in layers.all()" :value="index" :key="index" >
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                {{ layer.name }}
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>

                        </v-card>
                    </v-flex>

                    <v-flex>
                        <v-card>

                            <template v-if="loadingState">
                                <v-progress-linear :value="loadingState.sprites" buffer-value="0" stream></v-progress-linear>
                            </template>

                            <v-card-title class="headline justify-space-between">
                                Resources

                                <img v-if="selectedSprite" :src="selectedSprite.src" />
                            </v-card-title>

                            <v-card-text v-if="resources">

                                <v-container grid-list-xs>
                                    <v-layout wrap>
                                        <v-flex v-for="(sprite, index) in resources.sprites" :key="index" pa-0 pr-1 shrink>
                                            <img @click="spriteClicked(index)" :src="sprite.src" />
                                        </v-flex>
                                    </v-layout>
                                </v-container>

                            </v-card-text>

                        </v-card>
                    </v-flex>
                </v-layout>

            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import Engine from './../components/Game/Engine';
    import Layers from './../engine/layers/layers';
    import Layer from './../engine/layers/layer';

    export default {
        components: { Engine },

        computed: {
            selectedSprite() {
                if (this.selectedSpriteIndex == null) return null;

                return this.resources.sprites[this.selectedSpriteIndex];
            },

            selectedLayer() {
                if (! this.layers) return null;

                if (this.selectedLayerIndex == null) return null;

                return this.layers.all()[this.selectedLayerIndex];
            }
        },

        data() {
            return {
                layers: null,

                loadingState: null,

                resources: null,

                selectedLayerIndex: null,
                selectedSpriteIndex: null
            }
        },

        mounted() {
            this.makeLayers();
        },

        methods: {
            layerClicked(index) {
                this.selectedLayerIndex = index;
            },

            spriteClicked(index) {
                this.selectedSpriteIndex = index;
            },

            engineClick(x, y) {
                if (! this.selectedLayer) return;

                if (! this.selectedSprite) return;

                this.selectedLayer.state[y].splice(x, 1, this.selectedSpriteIndex);
            },

            loadingStateUpdate(loadingState) {
                this.loadingState = loadingState;
            },

            loaded(resources) {
                this.resources = resources;
            },

            makeLayers() {
                let layers = new Layers();

                let groundLayer = new Layer('Ground');
                groundLayer.state = this.makeState(0);
                layers.add(groundLayer);

                let structureLayer = new Layer('Structure');
                structureLayer.state = this.makeState();
                layers.add(structureLayer);

                this.layers = layers;
            },

            makeState(value = null) {
                let state = [];

                for (let x = 0; x < 20; x++) {
                    state.push([]);

                    for (let y = 0; y < 20; y++) {
                        state[x].push(value);
                    }
                }

                return state;
            }
        }

    }
</script>
