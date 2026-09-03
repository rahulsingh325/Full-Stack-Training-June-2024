import axios from 'axios';


// here i am creating an axios instance taaki hme baar baar base url na dena pade ya timeout na dena pade
export const mockApiInstance = axios.create({
	baseURL: "https://68b91534b71540504329eab4.mockapi.io",
	timeout: 10000
});


export const registerUser = async (data) => {                        // ye ak async function h jo user ko endpoint pe save krega. 
	try {
		const response = await mockApiInstance.post("/users", data); // is data me hm signup se user  ditiels le rhe h
		return response;                                             // agr aapko only user ka dala huaa data chahiye yani(payload) to aap yha response.data return kr skte h
	} catch (error) {
		console.error("Error registering user:", error);
		throw error;                                                 // Rethrow the error to be handled by the caller
	}
};

//  jab hm axios se request karte h get ,  post , to axios ak response object return krta h uske andar multipal cheeje hoti h -
//  like- data, status, statusText, headers, config, request
