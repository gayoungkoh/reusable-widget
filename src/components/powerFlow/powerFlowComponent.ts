import r2wc from "@r2wc/react-to-web-component";
import { PowerFlow } from "@/components/powerFlow/PowerFlow";

const powerFlowComponent = r2wc(PowerFlow, {
  props: {
    siteId: "string",
  },
});

customElements.define("power-flow", powerFlowComponent);
