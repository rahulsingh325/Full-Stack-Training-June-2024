import crispyDory from "../../assets/image/food/crispydory.jpg"
import kopagBenedict from "../../assets/image/food/kopagbenedict.jpg"
import hollandBitterballen from "../../assets/image/food/hollandbitterballen.jpg"

const OrdersData = [
    {
        id: 1,
        customer: "Rahul",
        table: "T-01",
        orderType: "Dine In",
        date: "Wed, July 12, 2024",
        time: "10:20 AM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 3, flavorProfile: "Medium - Not spicy", image: crispyDory },
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: kopagBenedict },
            { title: "Holland Bitterballen", price: 242.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: hollandBitterballen }
        ],
        subTotal: 985, // (25*3 + 451*1 + 242*2)
        taxPercent: 18,
        taxAmount: 177.3, // (18% of 985)
        discountAmount: 20,
        totalPayable: 1142.3, // (985 + 177.3 - 20)
        status: "waiting",
        paymentStatus: "Unpaid"

    },
    {
        id: 2,
        customer: "Priya",
        table: "T-02",
        orderType: "Take Away",
        date: "Thu, July 13, 2024",
        time: "11:10 AM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 3, flavorProfile: "Medium - Not spicy", image: crispyDory },
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: kopagBenedict },
            { title: "Holland Bitterballen", price: 242.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: hollandBitterballen }        ],
        subTotal: 1194, // (25*2 + 451*2 + 242*1)
        taxPercent: 18,
        taxAmount: 214.92,
        discountAmount: 30,
        totalPayable: 1378.92,
        status: "completed",
        paymentStatus: "Paid"
    },
    {
        id: 3,
        customer: "Amit",
        table: "T-03",
        orderType: "Dine In",
        date: "Fri, July 14, 2024",
        time: "12:00 PM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 3, flavorProfile: "Medium - Not spicy", image: crispyDory },
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: kopagBenedict },
            { title: "Holland Bitterballen", price: 242.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: hollandBitterballen }        ],
        subTotal: 1027, // (25*1 + 451*1 + 242*3)
        taxPercent: 18,
        taxAmount: 184.86,
        discountAmount: 25,
        totalPayable: 1186.86,
        status: "completed",
        paymentStatus: "Unpaid"
    },
    {
        id: 4,
        customer: "Sneha",
        table: "T-04",
        orderType: "Dine In",
        date: "Sat, July 15, 2024",
        time: "01:30 PM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 4, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 768, // (25*4 + 451*1 + 242*1)
        taxPercent: 18,
        taxAmount: 138.24,
        discountAmount: 15,
        totalPayable: 891.24,
        status: "waiting",
        paymentStatus: "Paid"
    },
    {
        id: 5,
        customer: "Vikram",
        table: "T-05",
        orderType: "Take Away",
        date: "Sun, July 16, 2024",
        time: "02:15 PM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 982, // (25*2 + 451*1 + 242*2)
        taxPercent: 18,
        taxAmount: 176.76,
        discountAmount: 20,
        totalPayable: 1138.76,
        status: "completed",
        paymentStatus: "Unpaid"
    },
    {
        id: 6,
        customer: "Riya",
        table: "T-06",
        orderType: "Dine In",
        date: "Mon, July 17, 2024",
        time: "03:00 PM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 3, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 1194, // (25*3 + 451*2 + 242*1)
        taxPercent: 18,
        taxAmount: 214.92,
        discountAmount: 30,
        totalPayable: 1378.92,
        status: "waiting",
        paymentStatus: "Paid"
    },
    {
        id: 7,
        customer: "Neha",
        table: "T-07",
        orderType: "Take Away",
        date: "Tue, July 18, 2024",
        time: "04:10 PM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 718, // (25*1 + 451*1 + 242*1)
        taxPercent: 18,
        taxAmount: 129.24,
        discountAmount: 10,
        totalPayable: 837.24,
        status: "completed",
        paymentStatus: "Unpaid"
    },
    {
        id: 8,
        customer: "Arjun",
        table: "T-08",
        orderType: "Dine In",
        date: "Wed, July 19, 2024",
        time: "05:20 PM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 1436, // (25*2 + 451*2 + 242*2)
        taxPercent: 18,
        taxAmount: 258.48,
        discountAmount: 40,
        totalPayable: 1654.48,
        status: "waiting",
        paymentStatus: "Paid"
    },
    {
        id: 9,
        customer: "Simran",
        table: "T-09",
        orderType: "Take Away",
        date: "Thu, July 20, 2024",
        time: "06:30 PM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 3, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 3, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 1269, // (25*3 + 451*1 + 242*3)
        taxPercent: 18,
        taxAmount: 228.42,
        discountAmount: 35,
        totalPayable: 1462.42,
        status: "completed",
        paymentStatus: "Unpaid"
    },
    {
        id: 10,
        customer: "Manish",
        table: "T-10",
        orderType: "Dine In",
        date: "Fri, July 21, 2024",
        time: "07:40 PM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 743, // (25*2 + 451*1 + 242*1)
        taxPercent: 18,
        taxAmount: 133.74,
        discountAmount: 15,
        totalPayable: 861.74,
        status: "waiting",
        paymentStatus: "Paid"
    },
    {
        id: 11,
        customer: "Kiran",
        table: "T-11",
        orderType: "Take Away",
        date: "Sat, July 22, 2024",
        time: "08:50 PM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 1411, // (25*1 + 451*2 + 242*2)
        taxPercent: 18,
        taxAmount: 253.98,
        discountAmount: 40,
        totalPayable: 1624.98,
        status: "completed",
        paymentStatus: "Unpaid"
    },
    {
        id: 12,
        customer: "Suresh",
        table: "T-12",
        orderType: "Dine In",
        date: "Sun, July 23, 2024",
        time: "09:00 PM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 4, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 966, // (25*4 + 451*2 + 242*1)
        taxPercent: 18,
        taxAmount: 173.88,
        discountAmount: 25,
        totalPayable: 1114.88,
        status: "waiting",
        paymentStatus: "Paid"
    },
    {
        id: 13,
        customer: "Anjali",
        table: "T-13",
        orderType: "Take Away",
        date: "Mon, July 24, 2024",
        time: "10:10 PM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 3, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 1027, // (25*2 + 451*1 + 242*3)
        taxPercent: 18,
        taxAmount: 184.86,
        discountAmount: 30,
        totalPayable: 1181.86,
        status: "completed",
        paymentStatus: "Unpaid"
    },
    {
        id: 14,
        customer: "Deepak",
        table: "T-14",
        orderType: "Dine In",
        date: "Tue, July 25, 2024",
        time: "11:20 PM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 3, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 1436, // (25*3 + 451*2 + 242*2)
        taxPercent: 18,
        taxAmount: 258.48,
        discountAmount: 40,
        totalPayable: 1654.48,
        status: "waiting",
        paymentStatus: "Paid"
    },
    {
        id: 15,
        customer: "Meera",
        table: "T-15",
        orderType: "Take Away",
        date: "Wed, July 26, 2024",
        time: "12:30 AM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 719, // (25*1 + 451*2 + 242*1)
        taxPercent: 18,
        taxAmount: 129.42,
        discountAmount: 15,
        totalPayable: 833.42,
        status: "completed",
        paymentStatus: "Unpaid"
    },
    {
        id: 16,
        customer: "Rakesh",
        table: "T-01",
        orderType: "Dine In",
        date: "Thu, July 27, 2024",
        time: "01:40 AM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 982, // (25*2 + 451*1 + 242*2)
        taxPercent: 18,
        taxAmount: 176.76,
        discountAmount: 20,
        totalPayable: 1138.76,
        status: "waiting",
        paymentStatus: "Paid"
    },
    {
        id: 17,
        customer: "Pooja",
        table: "T-01",
        orderType: "Take Away",
        date: "Fri, July 28, 2024",
        time: "02:50 AM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 3, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 768, // (25*3 + 451*1 + 242*1)
        taxPercent: 18,
        taxAmount: 138.24,
        discountAmount: 15,
        totalPayable: 891.24,
        status: "completed",
        paymentStatus: "Unpaid"
    },
    {
        id: 18,
        customer: "Sanjay",
        table: "T-18",
        orderType: "Dine In",
        date: "Sat, July 29, 2024",
        time: "03:00 AM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 1194, // (25*2 + 451*2 + 242*1)
        taxPercent: 18,
        taxAmount: 214.92,
        discountAmount: 30,
        totalPayable: 1378.92,
        status: "waiting",
        paymentStatus: "Paid"
    },
    {
        id: 19,
        customer: "Geeta",
        table: "T-19",
        orderType: "Take Away",
        date: "Sun, July 30, 2024",
        time: "04:10 AM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 560, // (25*1 + 451*1 + 242*2)
        taxPercent: 18,
        taxAmount: 100.8,
        discountAmount: 10,
        totalPayable: 650.8,
        status: "completed",
        paymentStatus: "Unpaid"
    },
    {
        id: 20,
        customer: "Kabir",
        table: "T-20",
        orderType: "Dine In",
        date: "Mon, July 31, 2024",
        time: "05:20 AM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 3, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 1269, // (25*2 + 451*1 + 242*3)
        taxPercent: 18,
        taxAmount: 228.42,
        discountAmount: 35,
        totalPayable: 1462.42,
        status: "waiting",
        paymentStatus: "Paid"
    },
    {
        id: 21,
        customer: "Tina",
        table: "T-21",
        orderType: "Take Away",
        date: "Tue, August 1, 2024",
        time: "06:00 AM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" }
        ],
        subTotal: 501,
        taxPercent: 18,
        taxAmount: 90.18,
        discountAmount: 10,
        totalPayable: 581.18,
        status: "canceled",
        paymentStatus: "Unpaid"
    },
    {
        id: 22,
        customer: "Varun",
        table: "T-22",
        orderType: "Dine In",
        date: "Wed, August 2, 2024",
        time: "07:10 AM",
        items: [
            { title: "Holland Bitterballen", price: 242.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 484,
        taxPercent: 18,
        taxAmount: 87.12,
        discountAmount: 5,
        totalPayable: 566.12,
        status: "canceled",
        paymentStatus: "Paid"
    },
    {
        id: 23,
        customer: "Mehul",
        table: "T-23",
        orderType: "Take Away",
        date: "Thu, August 3, 2024",
        time: "08:15 AM",
        items: [
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" }
        ],
        subTotal: 451,
        taxPercent: 18,
        taxAmount: 81.18,
        discountAmount: 5,
        totalPayable: 527.18,
        status: "canceled",
        paymentStatus: "Unpaid"
    },
    {
        id: 24,
        customer: "Ankit",
        table: "T-24",
        orderType: "Dine In",
        date: "Fri, August 4, 2024",
        time: "09:00 AM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 4, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" }
        ],
        subTotal: 100,
        taxPercent: 18,
        taxAmount: 18,
        discountAmount: 0,
        totalPayable: 118,
        status: "canceled",
        paymentStatus: "Paid"
    },
    {
        id: 25,
        customer: "Snehal",
        table: "T-25",
        orderType: "Take Away",
        date: "Sat, August 5, 2024",
        time: "10:30 AM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 267,
        taxPercent: 18,
        taxAmount: 48.06,
        discountAmount: 10,
        totalPayable: 305.06,
        status: "canceled",
        paymentStatus: "Unpaid"
    },
    {
        id: 26,
        customer: "Rachna",
        table: "T-26",
        orderType: "Dine In",
        date: "Sun, August 6, 2024",
        time: "11:45 AM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 3, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" }
        ],
        subTotal: 526,
        taxPercent: 18,
        taxAmount: 94.68,
        discountAmount: 10,
        totalPayable: 610.68,
        status: "ready to serve",
        paymentStatus: "Paid"
    },
    {
        id: 27,
        customer: "Harsh",
        table: "T-27",
        orderType: "Take Away",
        date: "Mon, August 7, 2024",
        time: "12:50 PM",
        items: [
            { title: "Kopag Benedict", price: 451.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 1144,
        taxPercent: 18,
        taxAmount: 205.92,
        discountAmount: 25,
        totalPayable: 1324.92,
        status: "ready to serve",
        paymentStatus: "Unpaid"
    },
    {
        id: 28,
        customer: "Alok",
        table: "T-28",
        orderType: "Dine In",
        date: "Tue, August 8, 2024",
        time: "01:30 PM",
        items: [
            { title: "Holland Bitterballen", price: 242.00, quantity: 3, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 726,
        taxPercent: 18,
        taxAmount: 130.68,
        discountAmount: 15,
        totalPayable: 841.68,
        status: "ready to serve",
        paymentStatus: "Paid"
    },
    {
        id: 29,
        customer: "Juhi",
        table: "T-29",
        orderType: "Take Away",
        date: "Wed, August 9, 2024",
        time: "02:10 PM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" }
        ],
        subTotal: 501,
        taxPercent: 18,
        taxAmount: 90.18,
        discountAmount: 10,
        totalPayable: 581.18,
        status: "ready to serve",
        paymentStatus: "Unpaid"
    },
    {
        id: 30,
        customer: "Neeraj",
        table: "T-30",
        orderType: "Dine In",
        date: "Thu, August 10, 2024",
        time: "03:25 PM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" }
        ],
        subTotal: 927,
        taxPercent: 18,
        taxAmount: 166.86,
        discountAmount: 20,
        totalPayable: 1073.86,
        status: "ready to serve",
        paymentStatus: "Paid"
    }


];

export default OrdersData;