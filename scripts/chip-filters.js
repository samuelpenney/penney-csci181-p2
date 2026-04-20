const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".project-card");
const filterStatus = document.querySelector("#filter-status");

function formatFilterLabel(filterValue) {
  if (filterValue === "all") {
    return "all";
  }

  const matchingChip = document.querySelector(
    `.chip[data-filter="${filterValue}"]`,
  );
  return matchingChip ? matchingChip.textContent.trim() : filterValue;
}

function updateFilterStatus(filterValue, visibleCount) {
  const filterLabel = formatFilterLabel(filterValue);
  const noun = visibleCount === 1 ? "project" : "projects";

  if (filterStatus) {
    if (filterValue === "all") {
      filterStatus.textContent = `Showing all ${visibleCount} ${noun}.`;
    } else {
      filterStatus.textContent = `Showing ${visibleCount} ${noun} in ${filterLabel}.`;
    }
  }
}

function setActiveChip(clicked_chip) {
  for (let index = 0; index < chips.length; index += 1) {
    const current_chip = chips[index];
    const is_active = current_chip === clicked_chip;

    if (is_active) {
      current_chip.classList.add("is-active");
      current_chip.setAttribute("aria-pressed", "true");
    } else {
      current_chip.classList.remove("is-active");
      current_chip.setAttribute("aria-pressed", "false");
    }
  }
}

function applyFilter(filter_value) {
  let visibleCount = 0;

  for (let index = 0; index < cards.length; index += 1) {
    const current_card = cards[index];
    const li = current_card.closest("li");

    if (li) {
      if (filter_value === "all") {
        li.hidden = false;
      } else {
        const card_category = current_card.dataset.category;
        li.hidden = card_category !== filter_value;
      }

      if (!li.hidden) {
        visibleCount += 1;
      }
    }
  }

  updateFilterStatus(filter_value, visibleCount);
}

function onChipClicked(event) {
  const clicked_chip = event.currentTarget;
  const filter_value = clicked_chip.dataset.filter;

  setActiveChip(clicked_chip);
  applyFilter(filter_value);
}

for (let index = 0; index < chips.length; index += 1) {
  chips[index].addEventListener("click", onChipClicked);
}

applyFilter("all");
