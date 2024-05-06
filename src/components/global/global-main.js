import ButtonVue from "./ButtonVue.vue";
import LoaderVue from "./LoaderVue.vue";
import CompanyLoaderVue from "./CompanyLoaderVue.vue";
import TableVue from "./TableVue.vue";
import PaginationVue from "./PaginationVue.vue";
import NoDataFoundVue from "./NoDataFoundVue.vue";
import ModalComp from '@/components/global/modal/ModalComp.vue';
import NormalAudioPlayer from "./NormalAudioPlayer.vue";
import ConfirmModalVue from "./modal/ConfirmModalVue.vue";
import SimpleLoaderVue from "./SimpleLoaderVue.vue";
import SpinnerVue from "./SpinnerVue.vue";
import ModalVue from "./ModalVue.vue";
import MobileTabSlider from "./MobileTabSlider.vue";
const GuiComponents = {
  install(Vue) {
    Vue.component("ButtonVue", ButtonVue);
    Vue.component("LoaderVue", LoaderVue);
    Vue.component("TableVue", TableVue);
    Vue.component("PaginationVue", PaginationVue);
    Vue.component("NoDataFoundVue", NoDataFoundVue);
    Vue.component("ModalComp", ModalComp);
    Vue.component("CompanyLoaderVue", CompanyLoaderVue);
    Vue.component("NormalAudioPlayer", NormalAudioPlayer);
    Vue.component("ConfirmModalVue", ConfirmModalVue);
    Vue.component("SimpleLoaderVue", SimpleLoaderVue);
    Vue.component("ModalVue", ModalVue);
    Vue.component("SpinnerVue", SpinnerVue);
    Vue.component("MobileTabSlider", MobileTabSlider);
  },
};
export default GuiComponents;
