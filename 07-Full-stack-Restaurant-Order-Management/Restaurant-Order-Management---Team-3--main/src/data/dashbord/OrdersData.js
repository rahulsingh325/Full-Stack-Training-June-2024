const OrdersData = [
    {
        id: 1,
        customer: "Rahul",
        table: "T-01",
        orderType: "Dine In",
        date: "Wed, July 12, 2024",
        time: "10:20 AM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 3, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 2, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 985, // (25*3 + 451*1 + 242*2)
        taxPercent: 18,
        taxAmount: 177.3, // (18% of 985)
        discountAmount: 20,
        totalPayable: 1142.3, // (985 + 177.3 - 20)
        status: "waiting",

    },
    {
        id: 2,
        customer: "Priya",
        table: "T-02",
        orderType: "Take Away",
        date: "Thu, July 13, 2024",
        time: "11:10 AM",
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
        status: "completed"
    },
    {
        id: 3,
        customer: "Amit",
        table: "T-03",
        orderType: "Dine In",
        date: "Fri, July 14, 2024",
        time: "12:00 PM",
        items: [
            { title: "Crispy Dory Sambal Matah", price: 25, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/crispy-dory.jpg" },
            { title: "Kopag Benedict", price: 451.00, quantity: 1, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/kopag-benedict.jpg" },
            { title: "Holland Bitterballen", price: 242.00, quantity: 3, flavorProfile: "Medium - Not spicy", image: "../../assets/images/food/holland-bitterballen.jpg" }
        ],
        subTotal: 1027, // (25*1 + 451*1 + 242*3)
        taxPercent: 18,
        taxAmount: 184.86,
        discountAmount: 25,
        totalPayable: 1186.86,
        status: "canceled"
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
        status: "Ready to serve"
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
        status: "completed"
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
        status: "canceled"
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
        status: "completed"
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
        status: "waiting"
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
        status: "Ready to serve"
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
        status: "canceled"
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
        status: "completed"
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
        status: "waiting"
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
        status: "Ready to serve"
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
        status: "waiting"
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
        status: "completed"
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
        status: "canceled"
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
        status: "ready to serve"
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
        status: "waiting"
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
        status: "completed"
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
        status: "canceled"
    }
];

export default OrdersData;