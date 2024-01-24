const urlMap = (url, method, resource_id) => {
	let resource, id;
	switch (url + " " + method) {
		case "master-users GET":
			resource = "master-users/admin";
			break;
		case "master-users DEL":
			resource = "master-users/deny";
			break;
		case "flats/admin PATCH":
			resource = "flats";
			break;

		case "maintenances/admin PATCH":
			resource = "maintenances/complete";
			break;

		default:
			resource = url;
			id = resource_id;
			break;
	}
	return { resource, id: id ? id : "" };
};

export default urlMap;
