import Notification from "../models/notification.model.js";


// login yapan kullanicinin follow like tum notifications degerleri alinir...
export const getNotifications = async (req, res) => {
	try {
		const userId = req.user._id;

        // userId değeri find edildi direkt findbyId de kullanilirdi fakat bu islemde sadece 1 belge elde edilir birden fazla elde edilmek istenildigi icin bu sekilde kullanildi (to)
        // path ile modelin içindeki from kısmı alındı select ile bu tanımın içerisindeki referans içerisinden
        // username ve profileImg değerleri alinmis oludu.
		const notifications = await Notification.find({ to: userId }).populate({
			path: "from",
			select: "username profileImg",
		});

		await Notification.updateMany({ to: userId }, { read: true });

		res.status(200).json(notifications);
	} catch (error) {
		console.log("Error in getNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const deleteNotifications = async (req, res) => {
	try {
		const userId = req.user._id;

		await Notification.deleteMany({ to: userId });

		res.status(200).json({ message: "Notifications deleted successfully" });
	} catch (error) {
		console.log("Error in deleteNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};