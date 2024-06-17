document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".tab");
    const activityButtons = document.querySelectorAll("#activity-bar button");
    const sidebarItems = document.querySelectorAll("#sidebar ul li.file");
    const editorContents = document.querySelectorAll(".editor-content");
    const tabsContainer = document.getElementById("tabs");

    function showContent(targetId) {
        editorContents.forEach(content => content.classList.add("hidden"));
        document.getElementById(targetId).classList.remove("hidden");

        tabs.forEach(t => t.classList.remove("bg-gray-700"));
        const activeTab = document.querySelector(`.tab[data-file='${targetId}']`);
        if (activeTab) activeTab.classList.add("bg-gray-700");
    }

    function createTab(targetId, name) {
        const existingTab = document.querySelector(`.tab[data-file='${targetId}']`);
        if (!existingTab) {
            const tab = document.createElement("div");
            tab.classList.add("tab", "px-4", "py-2", "cursor-pointer", "transition", "duration-300");
            tab.dataset.file = targetId;
            tab.textContent = name;
            tab.innerHTML += '<i class="fas fa-times ml-2 cursor-pointer close-tab"></i>';
            tabsContainer.appendChild(tab);
            tab.addEventListener("click", () => showContent(targetId));
        }
    }

    tabsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("close-tab")) {
            const tab = e.target.parentElement;
            const targetId = tab.dataset.file;
            tab.remove();
            document.getElementById(targetId).classList.add("hidden");
            if (targetId !== "main") {
                showContent("main");
            }
        }
    });

    activityButtons.forEach(button => {
        button.addEventListener("click", () => {
            const target = button.getAttribute("aria-label").toLowerCase().replace(" ", "-");
            showContent(target);
        });
    });

    sidebarItems.forEach(item => {
        item.addEventListener("click", () => {
            const file = item.getAttribute("data-file");
            createTab(file, item.textContent);
            showContent(file);
        });
    });

    // Ensure the main content is shown by default
    showContent("main");
});
