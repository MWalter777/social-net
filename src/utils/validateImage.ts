export const validateImageUrl = (url: string) => {
	return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
};
