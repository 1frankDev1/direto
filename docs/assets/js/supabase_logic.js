// Supabase shared configuration and logic
const SUPABASE_URL = 'https://cnoiesjjupubkrgyhbof.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNub2llc2pqdXB1YmtyZ3loYm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MjYxMjIsImV4cCI6MjA4NjIwMjEyMn0.GZ3gGs7Wk4IJm0Ebp-3bAUlFtKHPV6jTpLATacLcJhA';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Fetches businesses from Supabase and merges them with local data.
 */
async function getBusinesses(showAll = false) {
    let dynamicData = [];
    try {
        let query = supabaseClient.from('businesses').select('*');

        if (!showAll) {
            query = query.eq('is_visible', true);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;
        if (data) {
            dynamicData = data.map(item => ({
                id: item.id,
                name: item.name,
                city: item.city,
                state: item.state || '',
                zip: item.zip || '',
                category: item.category || 'Varios',
                logo: item.logo_url || 'https://via.placeholder.com/150?text=Logo',
                menuUrl: item.website || '',
                website: item.website || '',
                address: item.address_detail || '',
                social_media: item.social_media || {},
                hours: item.hours || {},
                is_restaurant: item.is_restaurant,
                cuid: item.cuid,
                ruid: item.ruid,
                has_reservation: item.has_reservation,
                order_url: item.order_url,
                reservation_url: item.reservation_url,
                is_visible: item.is_visible,
                owner_id: item.owner_id
            }));
        }
    } catch (e) {
        console.error("Error fetching from Supabase businesses:", e);
    }

    // Merge with local directoryData (from directory_data.js)
    // Local data serves as fallback or static content
    const merged = [...dynamicData, ...directoryData];
    return showAll ? merged : merged.filter(b => b.is_visible !== false);
}

/**
 * Auth check helpers
 */
function getLoggedInUser() {
    const session = sessionStorage.getItem('tragalero_user');
    return session ? JSON.parse(session) : null;
}

function logout() {
    sessionStorage.removeItem('tragalero_user');
    window.location.href = './login.html';
}

function checkAccess(roleRequired) {
    const user = getLoggedInUser();
    if (!user) {
        window.location.href = './login.html';
        return null;
    }
    if (roleRequired && user.role !== roleRequired && user.role !== 'Admin') {
        window.location.href = './restaurantapp.html';
        return null;
    }
    return user;
}
