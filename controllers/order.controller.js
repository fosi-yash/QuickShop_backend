import Order from '../models/Order.js'

// =============================== Save Order Details ============================>

export const addorder= async (req, res) => {
    const {
      username, address, products, orderID, totalprice, paymentid, captureid, paymentstatus, paymentdate
    } = req.body;
  
    const orderdata = new Order({
      username,
      products,
      orderID,
      totalprice,
      paymentid,
      captureid,
      paymentstatus,
      paymentdate,
      userid: req.user.id,
      address
    });
  
    try {
      await orderdata.save();
      res.json(orderdata);
    } catch (error) {
      console.error('Error saving order:', error);
      res.status(500).send({ error: 'Failed to save order' });
    }
  }

  // ========================== Update Order Details ==================================>


  export const orderdeletebtid=async (req, res) => {
    const id = req.params.id
    const { refundid } = req.body
    try {
      const order = await Order.findByIdAndUpdate(id, { $set: { refundid } }, { new: true })
      order.save()
      res.json(order)
    } catch (error) {
      console.log('error in update order', error)
    } 
 }

 // ========================== display Current Order Details==========================>

  export const getlastorder=async (req, res) => {
    try {
      const user = req.user.id;
      const order = await Order.findOne({ userid: user }).sort({ createdAt: -1 }).populate('address')
      res.json(order)
    } catch (error) {
      console.log('error in lastorder fetch', error)
    }
  }

  // =========================== Display All Orders ======================================>

  export const getallorder=async (req, res) => {
    const user = req.user.id;
    const orders = await Order.find({ userid: user }).sort({ createdAt: -1 })
    console.log(orders)
    res.json(orders)
  }

  // =========================== display Perticular Order Details==========================>
    
  export const getorderbyid=async (req, res) => {
    try {
      const user = req.params.id;
      const order = await Order.findById(user).populate('address')
      res.json(order)
    } catch (error) {
      console.log('error in lastorder fetch', error)
    }
  
  }

  // ============================ Display All Orders Of All Users =========================>


  export const allorder=async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 })
    console.log(orders)
    res.json(orders)
  }

  // ========================== Generate Revanue =====================================>

  
  export const revanue=async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $match: {
          $and: [
            { paymentstatus: 'COMPLETED' },
            {
              $or: [
                { refundid: { $exists: false } },
                { refundid: null },
                { refundid: '' }
              ]
            }
          ]
        }
      },
      {
        $group: {
          _id: {
            month: { $month: "$paymentdate" },
            year: { $year: "$paymentdate" }
          },
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: { $toDouble: "$totalprice" } }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const formatted = data.map(item => ({
      month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
      orders: item.totalOrders,
      revenue: item.totalRevenue
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Aggregation Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

