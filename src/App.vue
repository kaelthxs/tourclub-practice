<template>
  <div>
    <!-- <div class="face">
  <div class="eye left"></div>
  <div class="eye right"></div>
</div> -->

<button class="main__delete_button" @click="naruto">НЕ НАЖИМАЙ</button>
<div class="smoke" v-show="gleb"></div>
    <header class="header">
        <p class="header_title">Выбор таблицы</p>
        <select v-model="select_table" class="header__select">
            <option value="itemsvis" class="select__option">Пользователи</option>
            <option value="touristvis" class="select__option">Туристы</option>
            <option value="coachvis" class="select__option">Тренера</option>
            <option value="competitionvis" class="select__option">Соревнования</option>
            <option value="sectionvis" class="select__option">Секции</option>
            <option value="schedulevis" class="select__option">Расписания тренировок</option>
            <option value="groupssvis" class="select__option">Группы</option>
            <option value="routevis" class="select__option">Маршруты</option>
            <option value="hikevis" class="select__option">Походы</option>
            <option value="journalvis" class="select__option">Журнал</option>
        </select>
    </header>
    <ul>
      <div class="main__table" v-if="select_table === 'itemsvis'">
        <div class="table__table--wrapper">
          <li v-for="(item, index) in items.rows" :key="index" class="main-item">
          {{ items.rows[index].id}}
          {{ items.rows[index].name}}
          {{ items.rows[index].surname}}
          {{ items.rows[index].email}}
          {{ items.rows[index].phone_number}}
          {{ items.rows[index].role}}
          {{ items.rows[index].age}}
          {{ items.rows[index].instructor}}
          <div class="item__buttons--wrapper">
            <button method="GET" @click="deleteUser(items.rows[index].id)" class="main__delete_button">Удалить</button>
            <button method="POST" @click="FormUpdateUser(items.rows[index].id)" class="main__change_button" >Изменить</button>
          </div>

        </li>
        <div class="main__buttons">
        
        </div>
        </div>

        <button @click="FormAddUser" class="main__add_button">Добавить</button>
      </div>


      <div class="main__table" v-if="select_table === 'touristvis'">
        <div class="main__table--wrapper">
          <li v-for="(item, index) in tourist.rows" :key="index" class="main-item">
          {{ tourist.rows[index].id}}
          {{ tourist.rows[index].name}}
          {{ tourist.rows[index].surname}}
          {{ tourist.rows[index].user_id}}
          {{ tourist.rows[index].most_difficult_hike}}
          {{ tourist.rows[index].experience}}
          {{ tourist.rows[index].physics}}
          <button method="GET" @click="deleteTourist(tourist.rows[index].id)" class="main__delete_button">Удалить</button>
          <button method="POST" @click="FormUpdateTourist(tourist.rows[index].id)" class="main__change_button" >Изменить</button>
        </li>
        <div class="main__buttons">
        </div>
        </div>
        <button @click="FormAddTourist" class="main__add_button">Добавить</button>
      </div>

      <div class="main__table" v-if="select_table === 'coachvis'">
        <div class="main__table--wrapper">
          <li v-for="(item, index) in coach.rows" :key="index" class="main-item">
          {{ coach.rows[index].id}}
          {{ coach.rows[index].name}}
          {{ coach.rows[index].surname}}
          {{ coach.rows[index].user_id}}
          {{ coach.rows[index].most_difficult_hike}}
          {{ coach.rows[index].section}}
          {{ coach.rows[index].load_hours}}
          {{ coach.rows[index].physics}}
          <button method="GET" @click="deleteCoach(coach.rows[index].id)" class="main__delete_button">Удалить</button>
          <button method="POST" @click="FormUpdateCoach(coach.rows[index].id)" class="main__delete_button">Удалить</button>
        </li>
        <div class="main__buttons">
          <button @click="FormAddCoach" class="main__add_button">Добавить</button>
        </div>
        </div>
      </div>

      <div class="main__table" v-if="select_table === 'competitionvis'">
        <div class="main__table--wrapper">
          <li v-for="(item, index) in competition.rows" :key="index" class="main-item">
          {{ competition.rows[index].id}}
          {{ competition.rows[index].winner}}
          {{ competition.rows[index].date_of_competition}}
          <button method="GET" @click="deleteCompetition(competition.rows[index].id)" class="main__delete_button">Удалить</button>
          <button method="POST" @click="FormUpdateCompetition(competition.rows[index].id)" class="main__change_button" >Изменить</button>
        </li>
        <div class="main__buttons">
          <button @click="FormAddCompetition" class="main__add_button">Добавить</button>
        </div>
        </div> 
      </div>

      <div class="main__table" v-if="select_table === 'sectionvis'">
        <div class="main__table--wrapper">
          <li v-for="(item, index) in section.rows" :key="index" class="main-item">
            {{ section.rows[index].id}}
            {{ section.rows[index].chief_id}}
            {{ section.rows[index].name}}
            <button method="GET" @click="deleteSection(section.rows[index].id)" class="main__delete_button">Удалить</button>
            <button method="POST" @click="FormUpdateSection(section.rows[index].id)" class="main__change_button" >Изменить</button>
              </li>
          <div class="main__buttons">
              <button @click="FormAddSection" class="main__add_button">Добавить</button>
          </div>
        </div>

      </div>

      <div class="main__table" v-if="select_table === 'schedulevis'">
        <div class="main__table--wrapper">
          <li v-for="(item, index) in schedule.rows" :key="index" class="main-item">
            {{ schedule.rows[index].id}}
            {{ schedule.rows[index].section_id}}
            {{ schedule.rows[index].training_type}}
            {{ schedule.rows[index].schedul_date}}
            <button method="GET" @click="deleteSchedule(schedule.rows[index].id)" class="main__delete_button">Удалить</button>
            <button method="POST" @click="FormUpdateSchedule(schedule.rows[index].id)" class="main__change_button" >Изменить</button>
          </li>
        <div class="main__buttons">
          <button @click="FormAddSchedule" class="main__add_button">Добавить</button>
        </div>
        </div>
      
      </div>

      <div class="main__table" v-if="select_table === 'groupssvis'">
        <div class="main__table--wrapper">
          <li v-for="(item, index) in groupss.rows" :key="index" class="main-item">
          {{ groupss.rows[index].id}}
          {{ groupss.rows[index].section_id}}
          {{ groupss.rows[index].coach_id}}
          <button method="GET" @click="deleteGroupss(groupss.rows[index].id)" class="main__delete_button">Удалить</button>
          <button method="POST" @click="FormUpdateGroupss(groupss.rows[index].id)" class="main__change_button" >Изменить</button>
        </li>
        <div class="main__buttons">
          <button @click="FormAddGroupss" class="main__add_button">Добавить</button>
        </div>
        </div>  
      </div>

      <div class="main__table" v-if="select_table === 'routevis'">
        <div class="main__table--wrapper">
          <li v-for="(item, index) in route.rows" :key="index" class="main-item">
            {{ route.rows[index].id}}
            {{ route.rows[index].spot_of_beginning}}
            {{ route.rows[index].spot_of_finish}}
            {{ route.rows[index].the_presence_of_reservoirs}}
            {{ route.rows[index].the_presence_of_mountains}}
            <button method="GET" @click="deleteRoute(route.rows[index].id)" class="main__delete_button">Удалить</button>
            <button method="POST" @click="FormUpdateRoute(route.rows[index].id)" class="main__change_button" >Изменить</button>
          </li>
        <div class="main__buttons">
          <button @click="FormAddRoute" class="main__add_button">Добавить</button>
        </div>
        </div>
      
      </div>

      <div class="main__table" v-if="select_table === 'hikevis'">
        <div class="main__table--wrapper">
          <li v-for="(item, index) in hike.rows" :key="index" class="main-item">
            {{ hike.rows[index].id}}
            {{ hike.rows[index].date_of_beginning}}
            {{ hike.rows[index].date_of_finish}}
            {{ hike.rows[index].plan}}
            {{ hike.rows[index].difficult}}
            {{ hike.rows[index].type}}
            {{ hike.rows[index].instructor_id}}
            {{ hike.rows[index].route_id}}
            <button method="GET" @click="deleteHike(hike.rows[index].id)" class="main__delete_button">Удалить</button>
            <button method="POST" @click="FormUpdateHike(hike.rows[index].id)" class="main__change_button" >Изменить</button>
          </li>
          <div class="main__buttons">
            <button @click="FormAddHike" class="main__add_button">Добавить</button>
          </div>
        </div>
        
      </div> 

      <div class="main__table" v-if="select_table === 'journalvis'">
        <div class="main__table--wrapper">
          <li v-for="(item, index) in journal.rows" :key="index" class="main-item">
          {{ journal.rows[index].id}}
          {{ journal.rows[index].date_of_hike}}
          {{ journal.rows[index].description}}
          {{ journal.rows[index].hike_id}}
          <button method="GET" @click="deleteJournal(journal.rows[index].id)" class="main__delete_button">Удалить</button>
          <button method="POST" @click="FormUpdateJournal(schedule.rows[index].id)" class="main__change_button" >Изменить</button>
          </li>
          <div class="main__buttons">
            <button @click="FormAddJournal" class="main__add_button">Добавить</button>
           </div>
        </div>  

      </div>
    </ul>
    
    <div class="main__input" v-show="this.user_add_form_bool">
      <input type="text" placeholder="Введите имя пользователя" id="" v-model="user_name">
      <input type="text" placeholder="Введите фамилию пользователя" name="user_surname" v-model="user_surname">
      <input type="text" placeholder="Введите почту пользователя" name="user_email" v-model="user_email">
      <input type="text" placeholder="Введите номер телефона пользователя" name="user_phone_number" v-model="user_phone_number">
      <p>Выберите роль пользователя</p>
      <select name="user_role" id="" v-model="user_role">
        <option value="CHIEF">CHIEF</option>
        <option value="COACH">COACH</option>
        <option value="TOURIST">TOURIST</option>
      </select>
      <input type="text" placeholder="Введите возраст пользователя" name="user_age" v-model="user_age">
      <p>Пользователь - инструктор?</p>
      <select name="user_instructor" v-model="user_instructor">
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <button @click="addUser">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.user_update_form_bool">
      <input type="text" placeholder="Введите имя пользователя" id="" v-model="user_name">
      <input type="text" placeholder="Введите фамилию пользователя" name="user_surname" v-model="user_surname">
      <input type="text" placeholder="Введите почту пользователя" name="user_email" v-model="user_email">
      <input type="text" placeholder="Введите номер телефона пользователя" name="user_phone_number" v-model="user_phone_number">
      <p>Выберите роль пользователя</p>
      <select name="user_role" id="" v-model="user_role">
        <option value="CHIEF">CHIEF</option>
        <option value="COACH">COACH</option>
        <option value="TOURIST">TOURIST</option>
      </select>
      <input type="text" placeholder="Введите возраст пользователя" name="user_age" v-model="user_age">
      <p>Пользователь - инструктор?</p>
      <select name="user_instructor" v-model="user_instructor">
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <button @click="updateUser(this.user_id_for_update)">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.tourist_add_form_bool">
      <input type="text" placeholder="Введите имя пользователя" id="" v-model="tourist_name">
      <input type="text" placeholder="Введите фамилию пользователя" name="user_surname" v-model="tourist_surname">
      <input type="text" placeholder="Введите id пользователя" name="user_email" v-model="tourist_user_id">
      <p>Выберите вид самого тяжелого похода</p>
      <select name="" id="" v-model="tourist_most_difficult_hike">
        <option value="EASY">EASY</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>
      <p>Выберите опыт туриста</p>
      <select name="user_instructor" v-model="tourist_experience">
        <option value="SPORTSMAN">Спортсмен</option>
        <option value="BEGINNER">Начинающий</option>
      </select>
      <p>Выберите вид туриста</p>
      <select name="user_role" id="" v-model="tourist_physics">
        <option value="WATERIST">Водяной</option>
        <option value="SPELEOLOGIST">Спелеолог</option>
        <option value="CLIMBER">Лазающий по горам</option>
      </select>

      <button @click="addTourist">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.tourist_update_form_bool">
      <input type="text" placeholder="Введите имя пользователя" id="" v-model="tourist_name">
      <input type="text" placeholder="Введите фамилию пользователя" name="user_surname" v-model="tourist_surname">
      <input type="text" placeholder="Введите id пользователя" name="user_email" v-model="tourist_user_id">
      <p>Выберите вид самого тяжелого похода</p>
      <select name="" id="" v-model="tourist_most_difficult_hike">
        <option value="EASY">EASY</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>
      <p>Выберите опыт туриста</p>
      <select name="user_instructor" v-model="tourist_experience">
        <option value="SPORTSMAN">Спортсмен</option>
        <option value="BEGINNER">Начинающий</option>
      </select>
      <p>Выберите вид туриста</p>
      <select name="user_role" id="" v-model="tourist_physics">
        <option value="WATERIST">Водяной</option>
        <option value="SPELEOLOGIST">Спелеолог</option>
        <option value="CLIMBER">Лазающий по горам</option>
      </select>

      <button @click="updateTourist(this.tourist_id_for_update)">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.coach_add_form_bool">
      <input type="text" placeholder="Введите имя пользователя" id="" v-model="coach_name">
      <input type="text" placeholder="Введите фамилию пользователя" name="user_surname" v-model="coach_surname">
      <input type="text" placeholder="Введите id пользователя" name="user_email" v-model="coach_user_id">
      <p>Выберите вид самого тяжелого похода</p>
      <select name="" id="" v-model="coach_most_difficult_hike">
        <option value="EASY">EASY</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>
      <input type="text" placeholder="Введите секцию пользователя" name="user_email" v-model="coach_section">
      <input type="text" placeholder="Введите нагрузку в часах" name="user_email" v-model="coach_load_hours">
      <p>Выберите вид туриста</p>
      <select name="user_role" id="" v-model="coach_physics">
        <option value="WATERIST">Водяной</option>
        <option value="SPELEOLOGIST">Спелеолог</option>
        <option value="CLIMBER">Лазающий по горам</option>
      </select>
      <button @click="addCoach">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.coach_update_form_bool">
      <input type="text" placeholder="Введите имя пользователя" id="" v-model="coach_name">
      <input type="text" placeholder="Введите фамилию пользователя" name="user_surname" v-model="coach_surname">
      <input type="text" placeholder="Введите id пользователя" name="user_email" v-model="coach_user_id">
      <p>Выберите вид самого тяжелого похода</p>
      <select name="" id="" v-model="coach_most_difficult_hike">
        <option value="EASY">EASY</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>
      <input type="text" placeholder="Введите секцию пользователя" name="user_email" v-model="coach_section">
      <input type="text" placeholder="Введите нагрузку в часах" name="user_email" v-model="coach_load_hours">
      <p>Выберите вид туриста</p>
      <select name="user_role" id="" v-model="coach_physics">
        <option value="WATERIST">Водяной</option>
        <option value="SPELEOLOGIST">Спелеолог</option>
        <option value="CLIMBER">Лазающий по горам</option>
      </select>
      <button @click="updateCoach(this.coach_id_for_update)">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.competition_add_form_bool">
      <input type="text" placeholder="Введите победителя" id="" v-model="competition_winner">
      <input type="date" placeholder="Введите дату соревнования" name="user_surname" v-model="competition_date_of_competition">
      <button @click="addCompetition">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.competition_update_form_bool">
      <input type="text" placeholder="Введите победителя" id="" v-model="competition_winner">
      <input type="date" placeholder="Введите дату соревнования" name="user_surname" v-model="competition_date_of_competition">
      <button @click="updateCompetition(this.competition_id_for_update)">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.section_add_form_bool">
      <input type="text" placeholder="Введите chief_id" id="" v-model="section_chief_id">
      <input type="text" placeholder="Введите название секции" name="user_surname" v-model="section_name">
      <button @click="addSection">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.section_update_form_bool">
      <input type="text" placeholder="Введите chief_id" id="" v-model="section_chief_id">
      <input type="text" placeholder="Введите название секции" name="user_surname" v-model="section_name">
      <button @click="updateSection(this.section_id_for_update)">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.schedule_add_form_bool">
      <input type="text" placeholder="Введите section_id" id="" v-model="schedule_section_id">
      <input type="text" placeholder="Введите вид тренировки" name="user_surname" v-model="schedule_training_type">
      <input type="date" placeholder="Введите дату расписания" name="user_email" v-model="schedule_schedul_date">
      <button @click="addSchedule">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.schedule_update_form_bool">
      <input type="text" placeholder="Введите section_id" id="" v-model="schedule_section_id">
      <input type="text" placeholder="Введите вид тренировки" name="user_surname" v-model="schedule_training_type">
      <input type="date" placeholder="Введите дату расписания" name="user_email" v-model="schedule_schedul_date">
      <button @click="updateSchedule(this.schedule_id_for_update)">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.groupss_add_form_bool">
      <input type="text" placeholder="Введите section_id" id="" v-model="groupss_section_id">
      <input type="text" placeholder="Введите coach_id" name="user_surname" v-model="groupss_coach_id">
      <button @click="addGroupss">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.groupss_update_form_bool">
      <input type="text" placeholder="Введите section_id" id="" v-model="groupss_section_id">
      <input type="text" placeholder="Введите coach_id" name="user_surname" v-model="groupss_coach_id">
      <button @click="updateGroupss(this.groupss_id_for_update)">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.route_add_form_bool">
      <input type="text" placeholder="Введите начало маршрута" id="" v-model="route_spot_of_beginning">
      <input type="text" placeholder="Введите конец маршрута" name="user_surname" v-model="route_spot_of_finish">
      <p>В маршруте есть водоемы?</p>
      <select name="user_instructor" v-model="route_the_presence_of_reservoirs">
        <option value="true">Да</option>
        <option value="false">Нет</option>
      </select>
      <p>В маршруте есть горы?</p>
      <select name="user_instructor" v-model="route_the_presence_of_mountains">
        <option value="true">Да</option>
        <option value="false">Нет</option>
      </select>
      <button @click="addRoute">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.route_update_form_bool">
      <input type="text" placeholder="Введите начало маршрута" id="" v-model="route_spot_of_beginning">
      <input type="text" placeholder="Введите конец маршрута" name="user_surname" v-model="route_spot_of_finish">
      <p>В маршруте есть водоемы?</p>
      <select name="user_instructor" v-model="route_the_presence_of_reservoirs">
        <option value="true">Да</option>
        <option value="false">Нет</option>
      </select>
      <p>В маршруте есть горы?</p>
      <select name="user_instructor" v-model="route_the_presence_of_mountains">
        <option value="true">Да</option>
        <option value="false">Нет</option>
      </select>
      <button @click="updateRoute(this.route_id_for_update)">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.hike_add_form_bool">
      <input type="date" placeholder="Введите дату начала похода" id="" v-model="hike_date_of_beginning">
      <input type="date" placeholder="Введите дату конца похода" name="user_surname" v-model="hike_date_of_finish">
      <p>Поход запланирован?</p>
      <select name="user_role" id="" v-model="hike_plan">
        <option value="PLANNED">Запланированный</option>
        <option value="UNPLANNED">Незапланированный</option>
      </select>
      <input type="text" placeholder="Введите сложность похода" name="user_age" v-model="hike_difficult">
      <p>Выберите тип похода</p>
      <select name="user_instructor" v-model="hike_type">
        <option value="WALKING">Пеший</option>
        <option value="CAVALRY">Конный</option>
        <option value="WATER">Водный</option>
        <option value="MOUNTAIN">Горный</option>
      </select>
      <input type="text" placeholder="Введите instructor_id" id="" v-model="hike_instructor_id">
      <input type="text" placeholder="Введите route_id" name="user_surname" v-model="hike_route_id">
      <button @click="addHike">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.hike_update_form_bool">
      <input type="date" placeholder="Введите дату начала похода" id="" v-model="hike_date_of_beginning">
      <input type="date" placeholder="Введите дату конца похода" name="user_surname" v-model="hike_date_of_finish">
      <p>Поход запланирован?</p>
      <select name="user_role" id="" v-model="hike_plan">
        <option value="PLANNED">Запланированный</option>
        <option value="UNPLANNED">Незапланированный</option>
      </select>
      <input type="text" placeholder="Введите сложность похода" name="user_age" v-model="hike_difficult">
      <p>Выберите тип похода</p>
      <select name="user_instructor" v-model="hike_type">
        <option value="WALKING">Пеший</option>
        <option value="CAVALRY">Конный</option>
        <option value="WATER">Водный</option>
        <option value="MOUNTAIN">Горный</option>
      </select>
      <input type="text" placeholder="Введите instructor_id" id="" v-model="hike_instructor_id">
      <input type="text" placeholder="Введите route_id" name="user_surname" v-model="hike_route_id">
      <button @click="updateHike(this.hike_id_for_update)">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.journal_add_form_bool">
      <input type="date" placeholder="Введите дату похода" id="" v-model="journal_date_of_hike">
      <input type="text" placeholder="Введите описание" name="user_surname" v-model="journal_description">
      <input type="text" placeholder="Введите hike_id" name="user_surname" v-model="journal_hike_id">
      <button @click="addJournal">Добавить пользователя</button>
    </div>

    <div class="main__input" v-show="this.journal_update_form_bool">
      <input type="date" placeholder="Введите дату похода" id="" v-model="journal_date_of_hike">
      <input type="text" placeholder="Введите описание" name="user_surname" v-model="journal_description">
      <input type="text" placeholder="Введите hike_id" name="user_surname" v-model="journal_hike_id">
      <button @click="updateJournal(this.journal_id_for_update)">Добавить пользователя</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      items: [],
      tourist: [],
      coach: [],
      competition: [],
      section: [],
      schedule: [],
      groupss: [],
      route: [],
      hike: [],
      journal: [],
      user_add_form_bool: false,
      tourist_add_form_bool: false,
      coach_add_form_bool: false,
      competition_add_form_bool: false,
      section_add_form_bool: false,
      schedule_add_form_bool: false,
      groupss_add_form_bool: false,
      route_add_form_bool: false,
      journal_update_form_bool: false,
      select_table : '',

      user_name: [],
      user_surname: [],
      user_email: [],
      user_phone_number: [],
      user_role: [],
      user_age: [],
      user_instructor: false,

      tourist_name: [],
      tourist_surname: [],
      tourist_user_id: [],
      tourist_most_difficult_hike: [],
      tourist_experience: [],
      tourist_physics: [],

      name: [],
      surname: [],
      email: [],
      phone_number: [],
      role: [],
      age: [],
      user_id: [],
      most_difficult_hike: [],
      experience: [],
      physics: [],
      instructor: false,

      user_id_for_update: '',
      tourist_id_for_update: '',
      coach_id_for_update: '',
      competition_id_for_update: '',
      section_id_for_update: '',
      schedule_id_for_update: '',
      groupss_id_for_update: '',
      route_id_for_update: '',
      hike_id_for_update: '',
      journal_id_for_update: '',
      gleb: false

    };
  },
  methods: {

    naruto() {
      this.gleb = true
    },
    FormAddUser() {
      this.user_add_form_bool = true
    },

    FormAddTourist() {
      this.tourist_add_form_bool = true
    },

    FormAddCoach() {
      this.coach_add_form_bool = true
    },

    FormAddCompetition() {
      this.competition_add_form_bool = true
    },

    FormAddSection() {
      this.section_add_form_bool = true
    },

    FormAddSchedule() {
      this.schedule_add_form_bool = true
    },

    FormAddGroupss() {
      this.groupss_add_form_bool = true
    },

    FormAddRoute() {
      this.route_add_form_bool = true
    },

    FormAddHike() {
      this.hike_add_form_bool = true
    },

    FormAddJournal() {
      this.journal_add_form_bool = true
    },

    FormUpdateUser(id) {
      this.user_update_form_bool = true
      this.user_id_for_update = id
      console.log(this.user_id_for_update)
    },

    FormUpdateTourist(id) {
      this.tourist_update_form_bool = true
      this.tourist_id_for_update = id
      console.log(this.tourist_id_for_update)
    },

    FormUpdateCoach(id) {
      this.coach_update_form_bool = true
      this.coach_id_for_update = id
      console.log(this.coach_id_for_update)
    },

    FormUpdateCompetition(id) {
      this.competition_update_form_bool = true
      this.competition_id_for_update = id
      console.log(this.competition_id_for_update)
    },

    FormUpdateSection(id) {
      this.section_update_form_bool = true
      this.section_id_for_update = id
      console.log(this.t_id_for_update)
    },

    FormUpdateSchedule(id) {
      this.schedule_update_form_bool = true
      this.schedule_id_for_update = id
      console.log(this.schedule_id_for_update)
    },

    FormUpdateGroupss(id) {
      this.groupss_update_form_bool = true
      this.groupss_id_for_update = id
      console.log(this.groupss_id_for_update)
    },

    FormUpdateRoute(id) {
      this.route_update_form_bool = true
      this.route_id_for_update = id
      console.log(this.route_id_for_update)
    },

    FormUpdateHike(id) {
      this.hike_update_form_bool = true
      this.hike_id_for_update = id
      console.log(this.hike_id_for_update)
    },

    FormUpdateJournal(id) {
      this.journal_update_form_bool = true
      this.journal_id_for_update = id
      console.log(this.journal_id_for_update)
    },

      updateUser(id) {
          const dataToUpdate = {
            name: this.user_name,
            surname: this.user_surname,
            email: this.user_email,
            phone_number: this.user_phone_number,
            role: this.user_role,
            age: this.user_age,
            instructor: this.user_instructor
        };
        axios.post(`http://localhost:8080/updateUser/${id}`, dataToUpdate)
        .then(response => {
          console.log(response.data);
          this.getUsers()
        })
        .catch(error => {
          console.error(error);
        });
      },

      deleteUser(id) {
      axios.get(`http://localhost:8080/users/${id}`)
      .then(response => {
        this.getUsers()
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    },

    deleteTourist(id) {
      axios.get(`http://localhost:8080/tourist/${id}`)
      .then(response => {
        console.log(response.data);
        this.getTourist()
      })
      .catch(error => {
        console.error(error);
      });
    },

    deleteCoach(id) {
      axios.get(`http://localhost:8080/coach/${id}`)
      .then(response => {
        console.log(response.data);
        this.getCoach()
      })
      .catch(error => {
        console.error(error);
      });
    },

    deleteCompetition(id) {
      axios.get(`http://localhost:8080/competition/${id}`)
      .then(response => {
        console.log(response.data);
        this.getCompetition()
      })
      .catch(error => {
        console.error(error);
      });
    },

    deleteSection(id) {
      axios.get(`http://localhost:8080/section/${id}`)
      .then(response => {
        console.log(response.data);
        this.getSection()
      })
      .catch(error => {
        console.error(error);
      });
    },

    deleteSchedule(id) {
      axios.get(`http://localhost:8080/schedule/${id}`)
      .then(response => {
        console.log(response.data);
        this.getSchedule()
      })
      .catch(error => {
        console.error(error);
      });
    },

    deleteGroupss(id) {
      axios.get(`http://localhost:8080/groupss/${id}`)
      .then(response => {
        console.log(response.data);
        this.getGroupss()
      })
      .catch(error => {
        console.error(error);
      });
    },

    deleteRoute(id) {
      axios.get(`http://localhost:8080/route/${id}`)
      .then(response => {
        console.log(response.data);
        this.getRoute()
      })
      .catch(error => {
        console.error(error);
      });
    },

    deleteHike(id) {
      axios.get(`http://localhost:8080/hike/${id}`)
      .then(response => {
        console.log(response.data);
        this.getHike()
      })
      .catch(error => {
        console.error(error);
      });
    },

    deleteJournal(id) {
      axios.get(`http://localhost:8080/journal/${id}`)
      .then(response => {
        console.log(response.data);
        this.getJournal()
      })
      .catch(error => {
        console.error(error);
      });
    },

    addUser() {
      const newData = {
        name: this.user_name,
        surname: this.user_surname,
        email: this.user_email,
        phone_number: this.user_phone_number,
        role: this.user_role,
        age: this.user_age,
        instructor: this.user_instructor
      };
      console.log(newData);

      axios.post('http://localhost:8080/addUsers', newData)
        .then(response => {
          console.log(response.data);
          this.getUsers()
        })
        .catch(error => {
          console.error(error);
        });
  },

  addTourist() {
      const newData = {
        name: this.tourist_name,
        surname: this.tourist_surname,
        user_id: this.tourist_user_id,
        most_difficult_hike: this.tourist_most_difficult_hike,
        experience: this.tourist_experience,
        physics: this.tourist_physics,
      };
      console.log(newData);

      axios.post('http://localhost:8080/addTourist', newData)
        .then(response => {
          console.log(response.data);
          this.getTourist()
        })
        .catch(error => {
          console.error(error);
        });
  },

  updateTourist(id) {
      const newData = {
        name: this.tourist_name,
        surname: this.tourist_surname,
        user_id: this.tourist_user_id,
        most_difficult_hike: this.tourist_most_difficult_hike,
        experience: this.tourist_experience,
        physics: this.tourist_physics,
      };
      console.log(newData);

      axios.post(`http://localhost:8080/updateTourist/${id}`, newData)
        .then(response => {
          console.log(response.data);
          this.getTourist()
        })
        .catch(error => {
          console.error(error);
        });
  },

  addCoach() {
      const newData = {
        name: this.coach_name,
        surname: this.coach_surname,
        user_id: this.coach_user_id,
        most_difficult_hike: this.coach_most_difficult_hike,
        section: this.coach_section,
        load_hours: this.coach_load_hours,
        physics: this.coach_physics,
      };
      console.log(newData);

      axios.post('http://localhost:8080/addCoach', newData)
        .then(response => {
          console.log(response.data);
          this.getCoach()
        })
        .catch(error => {
          console.error(error);
        });
  },

  updateCoach(id) {
      const newData = {
        name: this.coach_name,
        surname: this.coach_surname,
        user_id: this.coach_user_id,
        most_difficult_hike: this.coach_most_difficult_hike,
        section: this.coach_section,
        load_hours: this.coach_load_hours,
        physics: this.coach_physics,
      };
      console.log(newData);

      axios.post(`http://localhost:8080/updateCoach/${id}`, newData)
        .then(response => {
          console.log(response.data);
          this.getCoach()
        })
        .catch(error => {
          console.error(error);
        });
  },

  addCompetition() {
      const newData = {
        winner: this.competition_winner,
        date_of_competition: this.competition_date_of_competition
      };
      console.log(newData);

      axios.post('http://localhost:8080/addCompetition', newData)
        .then(response => {
          console.log(response.data);
          this.getUsers()
        })
        .catch(error => {
          console.error(error);
        });
  },

  updateCompetition(id) {
      const newData = {
        winner: this.competition_winner,
        date_of_competition: this.competition_date_of_competition
      };
      console.log(newData);

      axios.post(`http://localhost:8080/updateCompetition/${id}`, newData)
        .then(response => {
          console.log(response.data);
          this.getCompetition()
        })
        .catch(error => {
          console.error(error);
        });
  },

  addSection() {
      const newData = {
        chief_id: this.section_chief_id,
        name: this.section_name
      };
      console.log(newData);

      axios.post('http://localhost:8080/addSection', newData)
        .then(response => {
          console.log(response.data);
          this.getSection()
        })
        .catch(error => {
          console.error(error);
        });
  },

  updateSection(id) {
      const newData = {
        chief_id: this.section_chief_id,
        name: this.section_name
      };
      console.log(newData);

      axios.post(`http://localhost:8080/updateSection/${id}`, newData)
        .then(response => {
          console.log(response.data);
          this.getSection()
        })
        .catch(error => {
          console.error(error);
        });
  },

  addSchedule() {
      const newData = {
        section_id: this.schedule_section_id,
        training_type: this.schedule_training_type,
        schedul: this.schedule_schedul_date
      };
      console.log(newData);

      axios.post('http://localhost:8080/addSchedule', newData)
        .then(response => {
          console.log(response.data);
          this.getSchedule()
        })
        .catch(error => {
          console.error(error);
        });
  },

  updateSchedule(id) {
      const newData = {
        section_id: this.schedule_section_id,
        training_type: this.schedule_training_type,
        schedul: this.schedule_schedul_date
      };
      console.log(newData);

      axios.post(`http://localhost:8080/updateSchedule/${id}`, newData)
        .then(response => {
          console.log(response.data);
          this.getSchedule()
        })
        .catch(error => {
          console.error(error);
        });
  },

  addGroupss() {
      const newData = {
        section_id: this.groupss_section_id,
        coach_id: this.groupss_coach_id
      };
      console.log(newData);

      axios.post('http://localhost:8080/addGroupss', newData)
        .then(response => {
          console.log(response.data);
          this.getGroupss()
        })
        .catch(error => {
          console.error(error);
        });
  },

  updateGroupss(id) {
      const newData = {
        section_id: this.groupss_section_id,
        coach_id: this.groupss_coach_id
      };
      console.log(newData);

      axios.post(`http://localhost:8080/updateGroupss/${id}`, newData)
        .then(response => {
          console.log(response.data);
          this.getGroupss()
        })
        .catch(error => {
          console.error(error);
        });
  },

  addRoute() {
      const newData = {
        spot_of_beginning: this.route_spot_of_beginning,
        spot_of_finish: this.route_spot_of_finish,
        the_presence_of_reservoirs: this.route_the_presence_of_reservoirs,
        the_presence_of_mountains: this.route_the_presence_of_mountains
      };
      console.log(newData);

      axios.post('http://localhost:8080/addRoute', newData)
        .then(response => {
          console.log(response.data);
          this.getRoute()
        })
        .catch(error => {
          console.error(error);
        });
  },

  updateRoute(id) {
      const newData = {
        spot_of_beginning: this.route_spot_of_beginning,
        spot_of_finish: this.route_spot_of_finish,
        the_presence_of_reservoirs: this.route_the_presence_of_reservoirs,
        the_presence_of_mountains: this.route_the_presence_of_mountains
      };
      console.log(newData);

      axios.post(`http://localhost:8080/updateRoute/${id}`, newData)
        .then(response => {
          console.log(response.data);
          this.getRoute()
        })
        .catch(error => {
          console.error(error);
        });
  },

  addHike() {
      const newData = {
        date_of_beginning: this.hike_date_of_beginning,
        date_of_finish: this.hike_date_of_finish,
        plan: this.hike_plan,
        difficult: this.hike_difficult,
        type: this.hike_type,
        instructor_id: this.hike_instructor_id,
        route_id: this.hike_route_id
      };
      console.log(newData);

      axios.post('http://localhost:8080/addHike', newData)
        .then(response => {
          console.log(response.data);
          this.getHike()
        })
        .catch(error => {
          console.error(error);
        });
  },

  updateHike(id) {
      const newData = {
        date_of_beginning: this.hike_date_of_beginning,
        date_of_finish: this.hike_date_of_finish,
        plan: this.hike_plan,
        difficult: this.hike_difficult,
        type: this.hike_type,
        instructor_id: this.hike_instructor_id,
        route_id: this.hike_route_id
      };
      console.log(newData);

      axios.post(`http://localhost:8080/updateHike/${id}`, newData)
        .then(response => {
          console.log(response.data);
          this.getHike()
        })
        .catch(error => {
          console.error(error);
        });
  },

  addJournal() {
      const newData = {
        date_of_hike: this.journal_date_of_hike,
        description: this.journal_description,
        hike_id: this.journal_hike_id
      };
      console.log(newData);
      axios.post('http://localhost:8080/addJournal', newData)
        .then(response => {
          console.log(response.data);
          this.getJournal()
        })
        .catch(error => {
          console.error(error);
        });
  },

  updateJournal(id) {
      const newData = {
        date_of_hike: this.journal_date_of_hike,
        description: this.journal_description,
        hike_id: this.journal_hike_id
      };
      console.log(newData);
      axios.post(`http://localhost:8080/updateJournal/${id}`, newData)
        .then(response => {
          console.log(response.data);
          this.getJournal()
        })
        .catch(error => {
          console.error(error);
        });
  },

  getUsers(){
      axios.get('http://localhost:8080/getUsers')
      .then(response => {
        this.items = response.data.message;
        console.log(this.items)
      })
      .catch(error => {
        console.error(error);
      });
    },

    getTourist(){
      axios.get('http://localhost:8080/getTourist')
      .then(response => {
        this.tourist = response.data.message;
        console.log(this.tourist)
      })
      .catch(error => {
        console.error(error);
      });

    },

    getCoach(){
      axios.get('http://localhost:8080/getCoach')
      .then(response => {
        this.coach = response.data.message;
        console.log(this.coach)
      })
      .catch(error => {
        console.error(error);
      });
    },

    getCompetition(){
      axios.get('http://localhost:8080/getCompetition')
      .then(response => {
        this.competition = response.data.message;
        console.log(this.competition)
      })
      .catch(error => {
        console.error(error);
      });
    },

    getSection(){
      axios.get('http://localhost:8080/getSection')
      .then(response => {
        this.section = response.data.message;
        console.log(this.section)
      })
      .catch(error => {
        console.error(error);
      });
    },

    getSchedule() {
      axios.get('http://localhost:8080/getSchedule')
      .then(response => {
        this.schedule = response.data.message;
        console.log(this.schedule)
      })
      .catch(error => {
        console.error(error);
      });
    },

    getGroupss(){
      axios.get('http://localhost:8080/getGroupss')
      .then(response => {
        this.groupss = response.data.message;
        console.log(this.groupss)
      })
      .catch(error => {
        console.error(error);
      });
    },

    getRoute(){
      axios.get('http://localhost:8080/getRoute')
      .then(response => {
        this.route = response.data.message;
        console.log(this.route)
      })
      .catch(error => {
        console.error(error);
      });
    },

    getHike(){
      axios.get('http://localhost:8080/getHike')
      .then(response => {
        this.hike = response.data.message;
        console.log(this.hike)
      })
      .catch(error => {
        console.error(error);
      });
    },

    getJournal(){
      axios.get('http://localhost:8080/getJournal')
      .then(response => {
        this.journal = response.data.message;
        console.log(this.journal)
      })
      .catch(error => {
        console.error(error);
      });
    },


    },



  

    
    created(){
      this.getUsers();
      this.getTourist();
      this.getCoach();
      this.getCompetition();
      this.getSection();
      this.getSchedule();
      this.getGroupss();
      this.getRoute();
      this.getHike();
      this.getJournal();
  },

  }
</script>
