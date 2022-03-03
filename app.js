const jwt = require('jsonwebtoken');
const axios = require('axios');

const token =
	'';

const verifyTokenFirebase = async (token) => {
	try {
		const decoded = jwt.decode(token, { complete: true });
		const kid = decoded.header.kid;
		const alg = decoded.header.alg;
		const urlCertiificate =
			'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';

		const res = await axios.get(urlCertiificate);
		let certificate = res.data[kid];

		return {
			ok: true,
			data: jwt.verify(token, certificate, { algorithms: [alg] }),
		};
	} catch (error) {
		return {ok: false, error};
	}
};
verifyTokenFirebase(token).then((res) => {
	console.log(res);
});
