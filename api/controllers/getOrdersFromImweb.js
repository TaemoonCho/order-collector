import { getAllOrders } from "../services/imweb/orders";

const getOrders = async (req, res) => {
    getAllOrders()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json(err);
        });
};

export { getOrders };
