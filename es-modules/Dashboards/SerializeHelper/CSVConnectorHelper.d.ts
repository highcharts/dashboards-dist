import type JSON from '../JSON';
import CSVConnector from '../../Data/Connectors/CSVConnector.js';
import Serializable from '../Serializable.js';
declare namespace CSVConnectorHelper {
    interface JSON extends Serializable.JSON<'Data.CSVConnector'> {
        options: OptionsJSON;
    }
    type OptionsJSON = (JSON.Object & CSVConnector.Options);
}
declare const CSVConnectorHelper: Serializable.Helper<CSVConnector, CSVConnectorHelper.JSON>;
export default CSVConnectorHelper;
