export default class Decoder {

    constructor() {

    }

    static encode(data) {
        return _.map(data, (d) => {
            return d.join(':');
        }).join(';');
    }

    static decode($string) {
        let result = [];

        let rows = _.split($string, ';');

        for (let i = 0; i < rows.length; i++) {
            result.push(_.split(rows[i], ':'));
        }

        return result;
    }
}