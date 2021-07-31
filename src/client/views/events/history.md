# Historial de cambios

## Envio de multiples archivos por *FormData*
```javascript
Object.keys(data).forEach((key) => {
	const value = data[key];
	if (Array.isArray(value) && value.length > 0) {
		for (let i = 0; i < value.length; i++) {
			formData.append(`${key}[]`, value[i]);
		}
	} else formData.append(key, value);
});
```
