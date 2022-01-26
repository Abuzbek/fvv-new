import http from "../../hooks/http";

export default {
  actions: {
    // Fetch all categories
    async getCategories(_, { lang }) {
      return await http.get('/' + lang + '/api/categories/?page_size=9999')
    },
    // fetch categories child
    async fetchCategoriesChild(id) {
      return await http.get('/api/categories/' + id)
    }
  },
}
