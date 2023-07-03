import type JSON from '../JSON';
import GoogleSheetsConnector from '../../Data/Connectors/GoogleSheetsConnector.js';
import Serializable from '../Serializable.js';
declare namespace GoogleSheetsConnectorHelper {
    interface JSON extends Serializable.JSON<'Data.GoogleSheetsConnector'> {
        options: OptionsJSON;
    }
    type OptionsJSON = (JSON.Object & GoogleSheetsConnector.Options);
}
declare const GoogleSheetsConnectorHelper: Serializable.Helper<GoogleSheetsConnector, GoogleSheetsConnectorHelper.JSON>;
export default GoogleSheetsConnectorHelper;
