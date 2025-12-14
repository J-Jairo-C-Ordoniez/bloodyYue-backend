// There was no repository specified for admin in the architecture diagram in README, 
// so service might aggregate data from other repos or have its own logic.
export const getDashboardStats = async () => {
    return {
        usersCount: 100,
        salesTotal: 5000
    };
};
