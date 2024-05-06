<template>
    <Teleport to="body">
        <!-- transitionInRootPosition :: start -->
        <Transition :name="transition">
            <!-- wrapper :: start -->
            <div v-if="show" class="modal_backdrop" @click.prevent="handleClickOutside">
                <!-- modal :: start -->
                <div class="modal_" :style="{ 'max-width': mWidth, 'height': mHeight }" :class="{'p-0': pNone}">
                    <div class="modal_content" @click.stop :class="{'p-0': pNone}">

                        <!-- Xbutton :: start -->
                        <div class="modal-sec" v-if="defaultCloseBtn">
                            <div class="modal-header-text"><h3>{{heading}}</h3></div>
                            <div class="close">
                                <button type="button" @click.prevent="closeModal">
                                    <img src="@/assets/icons/modal-close.svg">
                                </button>
                            </div>
                        </div>
                        <!-- Xbutton :: end -->

                        <!-- header :: start -->
                        <div>
                            <slot name="header"></slot>
                        </div>
                        <!-- header :: end -->

                        <!-- content :: start -->
                        <div>
                            <slot name="body"></slot>
                        </div>
                        <!-- content :: end -->

                        <!-- footer :: start -->
                        <div>
                            <slot name="footer"></slot>
                        </div>
                        <!-- footer :: end -->
                    </div>
                </div>
                <!-- modal :: end -->
            </div>
            <!-- wrapper :: end -->
        </Transition>
        <!-- transitionInRootPosition :: end -->
    </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
// #### PROPS
const props = defineProps({
    // Boolean to show / close the modal
    show: Boolean,

    // This needed to make the modal closable on clicking outside
    closable: {
        type: Boolean,
        default: true
    },
    pNone: {
        type: Boolean,
        default: false
    },
    defaultCloseBtn: {
        type: Boolean,
        default: true
    },

    // Allow the parent show / hide header
    showHeader: {
        type: Boolean,
        default: true
    },
    restrictRemoveScroll: {
        type: Boolean,
        default: false
    },

    // Allow the parent to control modal width
    mWidth: {
        type: String,
        default: "500px",
    },
    // Allow the parent to control modal height
    mHeight: {
        type: String,
        default: "",
    },
    // Allow the parent to control transition, Transitions css is wrapped in child component a.k.a in this modal
    transition: {
        type: String,
        default: "fade"
    },
    restrictRemoveScroll: {
        type: Boolean,
        default: false
    },
    heading: {
        type: String,
        default: ""
    }
});

// #### EVENTS
const emit = defineEmits(['close']);

// #### FUNCTIONS :: start
const closeModal = () => {
    emit('close')
};

const handleClickOutside = () => {
    if (props.closable) {
        closeModal();
    }
};
onBeforeRouteLeave((to, from, next) => {
    if (props.show) {
        // closeModal();
        next(false);
    } else {
        next();
    }
})
onMounted(() => {
    document.body.classList.add("hideScroll");
});
onUnmounted(() => {
    if (!props.restrictRemoveScroll) {
        document.body.classList.remove("hideScroll");
    }
});
// #### FUNCTIONS :: end
</script>

<style lang="scss" scoped>
.modal_backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(2px);
}

.modal_ {
    background: white;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 95vh;
    border-radius: 16px;
}

.modal_content {
    padding: 20px;
}

.modal_header,
.modal_footer {
    border: none;
}

.modal_header {
    position: relative;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start !important;
    gap: 10px;

    img {
        order: 1;
        margin-left: auto;
        height: 24px;
        width: 24px;
    }

    button {
        width: fit-content;
        margin-left: auto;
    }

    h1 {
        order: 2;

        @media screen and (max-width: 768px) {
            font-size: 24px !important;
            line-height: 40px !important;
        }
    }
}

.modal_body {
    position: relative;
}

.modal_body h2 {
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #000000;
    margin-bottom: 40px;
}

// NOTE: Do not edit below classes without informing vue team
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
