import r2wc from "@r2wc/react-to-web-component";
import { PowerFlowWrapper } from "@/components/powerFlow/PowerFlow";

const powerFlowComponent = r2wc(PowerFlowWrapper, {
  shadow: "open",
  props: {
    "site-id": "string",
  },
});

customElements.define("power-flow", powerFlowComponent);
