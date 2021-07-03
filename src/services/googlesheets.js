const { GoogleSpreadsheet } = require('google-spreadsheet');
const { sheets, authentication } = require('./../config');



const getSpreadsheet = async (sheet_id) => {
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(sheet_id);
    await doc.useServiceAccountAuth(authentication);
    await doc.loadInfo();

    return doc;
};


const getProducts = async (sheet_id, sheet_index, who, price, tags, take =3) => {


    const doc = await getSpreadsheet(sheet_id);
    const sheet = doc.sheetsByIndex[sheet_index];

    const rows = (await sheet.getRows()).sort( (row_a,row_b) => {
        let row_b_value = parseInt(row_b['Uso']);
        let row_a_value = parseInt(row_a['Uso']);

        row_b_value = isNaN(row_b_value) ? 0 : row_b_value;
        row_a_value = isNaN(row_a_value) ? 0 : row_a_value;
        return row_a_value - row_b_value;
    });

    let filtered_rows = rows.filter(row => row['Paraquem'].includes(who) );
    filtered_rows = filtered_rows.length > 0 ? filtered_rows : rows;
    let filtered_rows_price = filtered_rows.filter(row => row['Preço medio'].includes(price));
    filtered_rows = filtered_rows_price.length > 0 ? filtered_rows_price : filtered_rows;
    let filtered_rows_tags = filtered_rows.filter(row => row['Assunto'].includes(tags));
    filtered_rows = filtered_rows_tags.length > 0 ? filtered_rows_tags : filtered_rows;

    filtered_rows = filtered_rows.slice(0,(take > 0 ? take : 1));

    let products_map = filtered_rows.map(row => {
        // mark products
        let value_use = parseInt(row['Uso']);
        value_use = isNaN(value_use) ? 0 : value_use; 

        row['Uso'] = value_use + 1;

        console.log(row);

        return {
            index: row.rowIndex,
            name: row['Nome'],
            photo: row['Foto'],
            link: row['Link'],
            price: row['Preço']
        };
    });

    filtered_rows.map(async row => {
        await row.save();
    });

    console.log(products_map);

    return products_map;
};

module.exports = { getProducts };

