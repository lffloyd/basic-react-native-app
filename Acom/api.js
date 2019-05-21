import axios from 'axios';

exports.getHomeContent = async () => {
    try {
        const result = await axios.get('http://www.mocky.io/v2/5cd9c1c03000006d21c017f7');
        console.log('>> homeResult', JSON.stringify(result.data.maintop1.component.children[0].small));

        return ({
            galleryImage: result.data.maintop1.component.children[0].small,
            bannerImage: result.data.maintop2.component.children[0].small
        });

    } catch (e) {
        console.log('>> homeResult error', JSON.stringify(e));
        throw "Falha ao obter conteúdo da home: " + JSON.stringify(error);
    }
};

