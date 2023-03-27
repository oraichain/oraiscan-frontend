import _ from "lodash";
import { toBinary } from "@cosmjs/cosmwasm-stargate";

export const parseValue = item => {
	let value;
	if (item.isBinary) {
		value = toBinary(item.value);
	} else {
		const type = item.type;
		switch (true) {
			case ["any", "object"].includes(type):
				try {
					value = JSON.parse(item.value);
				} catch (e) {
					value = item.value;
				}
				break;
			case type === "integer" || [...type].includes("integer"):
				value = Number(item.value);
				break;
			case [...type].includes("boolean"):
				value = item.value === "true" ? true : false;
				break;

			default:
				value = item.value;
				break;
		}
	}
	return value;
};

export const getRef = (rootSchemas, ref) => {
	if (ref) {
		if (rootSchemas && rootSchemas[`/${ref}`]) {
			return rootSchemas[`/${ref}`];
		}
	}

	return null;
};

export const getRefType = (rootSchema, ref) => {
	if (ref && rootSchema) {
		if (rootSchema && rootSchema[`/${ref}`]) {
			const _ref = rootSchema[`/${ref}`];
			const type = _ref.type;
			if (type === "object") {
			}
			return rootSchema[`/${ref}`].type;
		}
	}

	return "any";
};

export const getType = (rootSchema, schema) => {
	const { $ref: ref, type: _type } = schema;
	const isBinary = ref === "#/definitions/Binary";

	const type = ref ? getRefType(rootSchema, ref) : _type;

	return {
		type: type || "any",
		isBinary,
	};
};

export const getProperties = (jsValidator, schema) => {
	const fieldName = _.first(Object.keys(schema.properties));

	const { $ref: ref } = schema.properties[fieldName];

	let props = ref ? getRef(jsValidator.schemas, ref) : schema.properties[fieldName];

	const childProps = props?.properties;

	let fieldList = [];

	if (childProps) {
		fieldList = Object.keys(childProps).map(e => ({
			fieldName: e,
			isRequired: props.required?.includes(e),
			...getType(jsValidator.schemas, childProps[e]),
		}));
	}

	return {
		resType: schema.type,
		fieldName,
		properties: props,
		fieldList,
	};
};

export const processMsgInput = async msg => {
	if (msg) {
		const { fieldList, fieldName } = msg;

		const msgObj = {
			[fieldName]: {},
		};

		fieldList.forEach(item => {
			const isError = item.isRequired && !item.value;

			if (!isError) {
				item.value &&
					_.assign(msgObj[fieldName], {
						[item.fieldName]: parseValue(item),
					});
				return;
			}

			_.assign(item, { isError });
			msgObj[fieldName] = null;
		});

		if (msgObj[fieldName]) {
			return msgObj;
		}
	}
};

export const makeSchemaInput = (jsValidator, schemas) => {
	if (!schemas) return [];
	return schemas
		.map(msg => {
			try {
				const properties = getProperties(jsValidator, msg);

				return properties;
			} catch (e) {
				return null;
			}
		})
		.filter(list => list?.fieldName !== "download_logo"); // ignore case download_logo - CW20
};
