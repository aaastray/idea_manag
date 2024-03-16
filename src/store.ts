import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
/*

    isAdmin(state) {
        const userRole = state.userRole;
        if (userRole === 'admin') return true
        else return false
    }
*/
export const useRoleStore = defineStore({
  id: 'roleStore',
  state: () => ({
    userRole: localStorage.getItem('userRole') || 'initiator',
    isAdmin: localStorage.getItem('userRole') === 'admin',
  }),
  getters: {
    getRoleName(state) {
      const userRole = state.userRole;
      if (userRole === 'initiator') return 'Инициатор идей';
      if (userRole === 'admin') return 'Администратор';
      return '';
    },
  },
  actions: {
    updateRole(role: string) {
        const userRole = role;
        if (userRole === 'admin') {
            localStorage.setItem('userRole', userRole);
            this.userRole = userRole;
            this.isAdmin = true;
        } else if (userRole === 'initiator') {
            localStorage.setItem('userRole', userRole);
            this.userRole = userRole;
            this.isAdmin = false;
        }
    },
    toggleUserRole() {
      const userRole = localStorage.getItem('userRole');
    
      if (userRole === 'admin') {
        localStorage.setItem('userRole', 'initiator');
        this.userRole = 'initiator';
        this.isAdmin = false;
      } else if (userRole === 'initiator') {
        localStorage.setItem('userRole', 'admin');
        this.userRole = 'admin';
        this.isAdmin = true;
      }
    }
}
});