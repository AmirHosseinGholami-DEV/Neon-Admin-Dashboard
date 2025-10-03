// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const sidebar = document.getElementById('sidebar');

mobileMenuButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
});

// User dropdown toggle
const userMenuButton = document.getElementById('userMenuButton');
const userDropdown = document.getElementById('userDropdown');

userMenuButton.addEventListener('click', () => {
    userDropdown.classList.toggle('hidden');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!userMenuButton.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.add('hidden');
    }
});

// Section switching
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.add('section-hidden');
        section.classList.remove('section-visible');
    });
    
    // Show the selected section
    const section = document.getElementById(sectionId);
    section.classList.remove('section-hidden');
    section.classList.add('section-visible');
    
    // Update page title
    const pageTitle = document.getElementById('pageTitle');
    pageTitle.textContent = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
    
    // Close mobile menu if open
    sidebar.classList.add('hidden');
    
    // Close user dropdown if open
    userDropdown.classList.add('hidden');
}

// Setting tab switching
function showSettingTab(tabId) {
    // Hide all setting tabs
    document.querySelectorAll('.setting-tab').forEach(tab => {
        tab.classList.add('setting-hidden');
        tab.classList.remove('setting-visible');
    });
    
    // Show the selected tab
    const tab = document.getElementById(tabId + 'Settings');
    tab.classList.remove('setting-hidden');
    tab.classList.add('setting-visible');
    
    // Update active tab button styling
    const tabButtons = document.querySelectorAll('#settings nav button');
    tabButtons.forEach(button => {
        if (button.textContent.trim().toLowerCase() === tabId) {
            button.classList.add('bg-purple-900/50', 'text-purple-400');
            button.classList.remove('hover:bg-purple-900/30');
        } else {
            button.classList.remove('bg-purple-900/50', 'text-purple-400');
            button.classList.add('hover:bg-purple-900/30');
        }
    });
}

// Logout modal
function openLogoutModal() {
    document.getElementById('logoutModal').classList.remove('hidden');
    // Close user dropdown if open
    userDropdown.classList.add('hidden');
}

function closeLogoutModal() {
    document.getElementById('logoutModal').classList.add('hidden');
}

function performLogout() {
    alert('Logging out...'); // In a real app, this would redirect to logout endpoint
    closeLogoutModal();
}

// Message conversations
function showConversation(conversationId) {
    const emptyConversation = document.getElementById('emptyConversation');
    const activeConversation = document.getElementById('activeConversation');
    const messageList = document.getElementById('messageList');
    
    emptyConversation.classList.add('hidden');
    activeConversation.classList.remove('hidden');
    
    // Reset selected state for all conversation items
    document.querySelectorAll('#messages .lg\\:col-span-4 [onclick^="showConversation"]').forEach(item => {
        item.classList.remove('bg-purple-900/10');
    });
    
    // Set selected state for current conversation
    event.currentTarget.classList.add('bg-purple-900/10');
    
    // Set conversation details based on ID (in a real app, this would fetch from API)
    let conversationName, conversationAvatar, conversationStatus;
    
    switch(conversationId) {
        case 'support':
            conversationName = 'Support Team';
            conversationAvatar = 'https://randomuser.me/api/portraits/women/33.jpg';
            conversationStatus = 'Online';
            break;
        case 'sarah':
            conversationName = 'Sarah Johnson';
            conversationAvatar = 'https://randomuser.me/api/portraits/women/44.jpg';
            conversationStatus = 'Online';
            break;
        case 'michael':
            conversationName = 'Michael Chen';
            conversationAvatar = 'https://randomuser.me/api/portraits/men/75.jpg';
            conversationStatus = 'Last seen 2 hours ago';
            break;
        case 'lisa':
            conversationName = 'Lisa Wong';
            conversationAvatar = 'https://randomuser.me/api/portraits/women/68.jpg';
            conversationStatus = 'Last seen yesterday';
            break;
        case 'robert':
            conversationName = 'Robert Davis';
            conversationAvatar = 'https://randomuser.me/api/portraits/men/12.jpg';
            conversationStatus = 'Online';
            break;
        default:
            conversationName = 'Unknown';
            conversationAvatar = '';
            conversationStatus = '';
    }
    
    document.getElementById('conversationName').textContent = conversationName;
    document.getElementById('conversationAvatar').src = conversationAvatar;
    document.getElementById('conversationStatus').textContent = conversationStatus;
    
    // Generate mock messages (in a real app, this would come from API)
    messageList.innerHTML = '';
    
    const messages = [
        { sender: conversationId === 'support' ? 'them' : 'me', text: 'Hi there!', time: '10:30 AM' },
        { sender: conversationId === 'support' ? 'me' : 'them', text: 'Hello! How can I help you today?', time: '10:32 AM' },
        { sender: conversationId === 'support' ? 'them' : 'me', text: 'I was wondering about the new features in the update.', time: '10:33 AM' },
        { sender: conversationId === 'support' ? 'me' : 'them', text: 'Absolutely! The latest update includes improved dashboard analytics and new customization options.', time: '10:35 AM' },
        { sender: conversationId === 'support' ? 'them' : 'me', text: 'That sounds great! When will it be available?', time: '10:36 AM' },
        { sender: conversationId === 'support' ? 'me' : 'them', text: 'The update is already rolling out. You should receive it within the next 24 hours.', time: '10:38 AM' }
    ];
    
    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`;
        
        messageDiv.innerHTML = `
            <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === 'me' ? 'bg-purple-600' : 'bg-black/30'}">
                <p>${msg.text}</p>
                <p class="text-xs text-gray-300 mt-1 text-right">${msg.time}</p>
            </div>
        `;
        
        messageList.appendChild(messageDiv);
    });
    
    // Scroll to bottom of messages
    messageList.scrollTop = messageList.scrollHeight;
}

// Initialize chart
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('trafficChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
                {
                    label: 'Visitors',
                    data: [1200, 1900, 1700, 2100, 2400, 2800, 3200],
                    borderColor: 'rgba(168, 85, 247, 1)',
                    backgroundColor: 'rgba(168, 85, 247, 0.05)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'New Users',
                    data: [800, 1100, 1200, 1400, 1700, 2000, 2400],
                    borderColor: 'rgba(74, 222, 128, 1)',
                    backgroundColor: 'rgba(74, 222, 128, 0.05)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#e2e8f0'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(148, 163, 184, 0.1)'
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(148, 163, 184, 0.1)'
                    },
                    ticks: {
                        color: '#94a3b8'
                    },
                    beginAtZero: true
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
});