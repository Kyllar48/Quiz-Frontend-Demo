import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { UserModel } from './models/user.model';
import { QuizModel } from './models/quiz.model';
import { QuestionModel } from './models/question.model';
import { AnswerModel } from './models/answer.model';
import { UserQuizSolutionModel } from './models/user-quiz-solution.model';

@Injectable({
  providedIn: 'root',
})
export class UserQuizService {
  constructor(private httpClient: HttpClient) {}

  public apiUrl = 'localhost:8080/api/v1';
  public mockedUsers = [
    { id: 1, username: 'Alexander', password: '1234', isAdmin: true },
    { id: 2, username: 'Denis', password: '1234', isAdmin: false },
    { id: 3, username: 'Giorgio', password: '1234', isAdmin: false },
    { id: 4, username: 'Jasmine', password: '1234', isAdmin: false },
    { id: 5, username: 'Michelle', password: '1234', isAdmin: false },
    { id: 6, username: 'Quinton', password: '1234', isAdmin: false },
    { id: 7, username: 'Tia', password: '1234', isAdmin: true },
    { id: 8, username: 'William', password: '1234', isAdmin: true },
  ] as UserModel[];

  public mockedQuizzes = [
    {
      id: 1,
      title: 'First Quiz',
      theory: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac laoreet felis. Quisque blandit urna sed gravida facilisis. Suspendisse placerat venenatis elementum. Ut sit amet tempor mi. Ut interdum porta lacus. Maecenas sollicitudin sapien eget nibh ultricies, ut faucibus dui dignissim. Nam vehicula porttitor tellus, ac finibus est vestibulum id. Etiam quis ipsum placerat, egestas augue ut, tincidunt dui. Vivamus fermentum sit amet sapien quis laoreet. Pellentesque sit amet leo sit amet ipsum mollis tempor. Donec dolor arcu, consequat eget pulvinar nec, sodales vel elit. Aliquam in sapien ac ipsum commodo tempor. Suspendisse faucibus rutrum ipsum, quis sodales tellus consequat nec.

Nulla vel orci est. Phasellus sem justo, vestibulum sit amet ornare eget, volutpat eu augue. Donec luctus mi sodales nulla tristique, ac tempus quam euismod. Fusce sem nunc, malesuada in massa non, scelerisque feugiat dui. Nulla vitae augue non urna posuere euismod. Integer at odio tincidunt quam accumsan volutpat et non justo. Cras ut fermentum lacus. Suspendisse in quam laoreet nunc viverra cursus ac nec leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur placerat vitae metus et luctus. Sed sit amet quam commodo, dignissim neque a, mollis nibh. Quisque tempor massa sit amet vehicula ornare. Proin a massa nibh. Maecenas efficitur lacus hendrerit, lacinia velit non, ultrices quam. Proin tristique ullamcorper augue, non molestie tellus posuere sit amet.

Mauris lacinia lacus eget vestibulum imperdiet. Vivamus nec luctus nisi. In a lectus pellentesque, suscipit dui nec, tempor erat. Sed a ligula risus. In egestas mi et dolor vehicula sollicitudin. Praesent pellentesque enim eget sem semper, sit amet convallis metus luctus. Nulla vel magna nec ligula blandit consequat.

Nulla pretium mauris eget sapien pretium luctus. Morbi tempus semper tincidunt. Pellentesque rhoncus vehicula posuere. Donec bibendum dapibus consequat. Fusce eget velit sit amet metus commodo ultricies et nec erat. Etiam scelerisque, risus id venenatis semper, quam purus viverra quam, sit amet venenatis justo nunc eu elit. Curabitur consequat urna sit amet lacus vehicula ullamcorper. Nunc aliquam, velit vel pulvinar auctor, ipsum quam tincidunt risus, non commodo felis dolor eget nunc. Proin luctus tellus in est finibus pulvinar. Proin dui risus, sodales nec metus a, elementum tempus eros.

Proin a est semper, iaculis nunc at, commodo sem. Mauris risus lectus, vestibulum mollis nisi at, imperdiet iaculis nisi. Donec eget suscipit velit. Morbi dictum eros sit amet luctus mattis. Ut et interdum nunc. Cras dictum ultricies metus quis porta. Nunc id turpis non nulla venenatis placerat. Fusce semper felis in turpis fermentum laoreet. Suspendisse blandit dui non lorem eleifend bibendum.
      `,
      questions: [
        {
          id: 1,
          statement: 'Question 1?',
          answers: [
            { id: 1, statement: 'Answer', displayOrder: 1, isCorrect: true },
            { id: 2, statement: 'Answer', displayOrder: 3, isCorrect: false },
            { id: 3, statement: 'Answer', displayOrder: 2, isCorrect: false },
            { id: 4, statement: 'Answer', displayOrder: 4, isCorrect: false },
          ] as AnswerModel[],
        },
        {
          id: 2,
          statement: 'Question 2?',
          answers: [
            { id: 5, statement: 'Answer', displayOrder: 1, isCorrect: false },
            { id: 6, statement: 'Answer', displayOrder: 4, isCorrect: true },
            { id: 7, statement: 'Answer', displayOrder: 2, isCorrect: false },
            { id: 8, statement: 'Answer', displayOrder: 3, isCorrect: false },
          ] as AnswerModel[],
        },
      ] as QuestionModel[],
    },
    {
      id: 2,
      title: 'Second Quiz',
      theory: 'Could be blank for all I care:)))))',
      questions: [
        {
          id: 3,
          statement: 'Question 3?',
          answers: [
            { id: 9, statement: 'Answer', displayOrder: 4, isCorrect: false },
            { id: 10, statement: 'Answer', displayOrder: 3, isCorrect: false },
            { id: 11, statement: 'Answer', displayOrder: 2, isCorrect: true },
            { id: 12, statement: 'Answer', displayOrder: 1, isCorrect: false },
          ] as AnswerModel[],
        },
        {
          id: 4,
          statement: 'Question 4?',
          answers: [
            { id: 13, statement: 'Answer', displayOrder: 4, isCorrect: false },
            { id: 14, statement: 'Answer', displayOrder: 1, isCorrect: false },
            { id: 15, statement: 'Answer', displayOrder: 2, isCorrect: true },
            { id: 16, statement: 'Answer', displayOrder: 3, isCorrect: false },
          ] as AnswerModel[],
        },
      ] as QuestionModel[],
    },
    {
      id: 3,
      title: 'Last Quiz',
      theory:
        'wr;bmer,nb[r,n]t,rrehmhbtrkmbkrtmgslemfrelmhlmrlsemlhmkrdlgmlrtsmblsrekmglvsmerklzgmelrnkmltdmknklymlgxmklemkfsrlkmgbkltrmblmrtkglntrhtr',
      questions: [
        {
          id: 5,
          statement: 'Question 5?',
          answers: [
            { id: 17, statement: 'Answer', displayOrder: 4, isCorrect: false },
            { id: 18, statement: 'Answer', displayOrder: 2, isCorrect: false },
            { id: 19, statement: 'Answer', displayOrder: 1, isCorrect: true },
            { id: 20, statement: 'Answer', displayOrder: 3, isCorrect: false },
          ] as AnswerModel[],
        },
        {
          id: 6,
          statement: 'Question 6?',
          answers: [
            { id: 21, statement: 'Answer', displayOrder: 3, isCorrect: true },
            { id: 22, statement: 'Answer', displayOrder: 2, isCorrect: false },
            { id: 23, statement: 'Answer', displayOrder: 1, isCorrect: false },
            { id: 24, statement: 'Answer', displayOrder: 4, isCorrect: false },
          ] as AnswerModel[],
        },
      ] as QuestionModel[],
    },
    {
      id: 4,
      title: 'Oooh! Fucking new Last Quiz',
      theory: `
      ewbpqmern[qmt[n,t4n
      rtnwe's5mrb[q'35nen,a\e
    ,\t.n rt\n ,tr\ ,sr\tn, t
  rberah.b\
4t,bne
w,nb
s]]]

      `,
      questions: [
        {
          id: 7,
          statement: 'Question 5?',
          answers: [
            { id: 17, statement: 'Answer', displayOrder: 4, isCorrect: false },
            { id: 18, statement: 'Answer', displayOrder: 2, isCorrect: false },
            { id: 19, statement: 'Answer', displayOrder: 1, isCorrect: true },
            { id: 20, statement: 'Answer', displayOrder: 3, isCorrect: false },
          ] as AnswerModel[],
        },
        {
          id: 8,
          statement: 'Question 6?',
          answers: [
            { id: 21, statement: 'Answer', displayOrder: 3, isCorrect: true },
            { id: 22, statement: 'Answer', displayOrder: 2, isCorrect: false },
            { id: 23, statement: 'Answer', displayOrder: 1, isCorrect: false },
            { id: 24, statement: 'Answer', displayOrder: 4, isCorrect: false },
          ] as AnswerModel[],
        },
      ] as QuestionModel[],
    },
    {
      id: 5,
      title: 'No me gusta lo mejor!<>',
      theory: `
      The red panda (Ailurus fulgens), also known as the lesser panda, is a small mammal native to the eastern Himalayas and southwestern China. It has dense reddish-brown fur with a black belly and legs, white-lined ears, a mostly white muzzle and a ringed tail. Its head-to-body length is 51–63.5 cm (20.1–25.0 in) with a 28–48.5 cm (11.0–19.1 in) tail, and it weighs between 3.2 and 15 kg (7.1 and 33.1 lb). It is well adapted to climbing due to its flexible joints and curved semi-retractile claws.

      The red panda was first formally described in 1825. The two currently recognised subspecies, the Himalayan and the Chinese red panda, genetically diverged about 250,000 years ago. The red panda's place on the evolutionary tree has been debated, but modern genetic evidence places it in close affinity with raccoons, weasels, and skunks. It is not closely related to the giant panda, which is a bear, though both possess elongated wrist bones or "false thumbs" used for grasping bamboo. The evolutionary lineage of the red panda (Ailuridae) stretches back around 25 to 18 million years ago, as indicated by extinct fossil relatives found in Eurasia and North America.

      The red panda inhabits coniferous forests as well as temperate broadleaf and mixed forests, favouring steep slopes with dense bamboo cover close to water sources. It is solitary and largely arboreal. It feeds mainly on bamboo shoots and leaves, but also on fruits and blossoms. Red pandas mate in early spring, with the females giving birth to litters of up to four cubs in summer. It is threatened by poaching as well as destruction and fragmentation of habitat due to deforestation. The species has been listed as Endangered on the IUCN Red List since 2015. It is protected in all range countries.

      Community-based conservation programmes have been initiated in Nepal, Bhutan and northeastern India; in China, it benefits from nature conservation projects. Regional captive breeding programmes for the red panda have been established in zoos around the world. It is featured in animated movies, video games, comic books and as the namesake of companies and music bands.
      `,
      questions: [
        {
          id: 5,
          statement: 'Question 5?',
          answers: [
            { id: 17, statement: 'Answer', displayOrder: 4, isCorrect: false },
            { id: 18, statement: 'Answer', displayOrder: 2, isCorrect: false },
            { id: 19, statement: 'Answer', displayOrder: 1, isCorrect: true },
            { id: 20, statement: 'Answer', displayOrder: 3, isCorrect: false },
          ] as AnswerModel[],
        },
        {
          id: 6,
          statement: 'Question 6?',
          answers: [
            { id: 21, statement: 'Answer', displayOrder: 3, isCorrect: true },
            { id: 22, statement: 'Answer', displayOrder: 2, isCorrect: false },
            { id: 23, statement: 'Answer', displayOrder: 1, isCorrect: false },
            { id: 24, statement: 'Answer', displayOrder: 4, isCorrect: false },
          ] as AnswerModel[],
        },
      ] as QuestionModel[],
    },
    {
      id: 6,
      title: 'Grammar 101',
      theory: `
      Morbi id commodo quam, non lacinia magna. Nulla id aliquet eros. Ut sed est tincidunt, convallis odio at, dapibus lacus. Nam ac pellentesque eros. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam pulvinar fermentum finibus. Suspendisse porta vel sapien at tincidunt. Pellentesque nec lorem rhoncus, volutpat tortor nec, maximus lacus. Phasellus ultricies egestas lacinia. Nullam id sem porttitor, iaculis mauris ut, dictum arcu. Aliquam ornare mi nibh, in congue velit laoreet et. Sed euismod bibendum purus sit amet varius. Aliquam euismod at quam a luctus. In hac habitasse platea dictumst. Etiam hendrerit mauris sed lacus auctor, nec aliquet nulla dignissim. In varius sem eget mauris sagittis blandit.

      Ut non leo et eros eleifend malesuada. Proin ut enim porttitor, dapibus eros eget, aliquet odio. Nulla vitae sem commodo magna consequat imperdiet ut quis justo. Nullam feugiat massa a diam pretium accumsan a ut magna. Phasellus quis dui euismod, sodales quam non, sodales elit. Suspendisse nec massa sodales justo aliquet consectetur ac ac magna. Pellentesque ultricies dignissim nisi sodales bibendum.

      Suspendisse imperdiet euismod efficitur. Nunc lorem eros, vulputate id mattis ac, aliquet quis elit. Aenean sed sapien velit. Integer porta hendrerit nisi, et accumsan ligula euismod ut. Praesent vestibulum semper lectus, nec cursus tortor iaculis quis. Mauris vel elit non ligula congue efficitur eget lacinia risus. Nullam malesuada, neque a consequat tincidunt, metus lectus mollis augue, at tincidunt enim lacus non
     `,
      questions: [] as QuestionModel[],
    },
    {
      id: 7,
      title: 'A long description',
      theory: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus urna felis, facilisis ut interdum et, auctor non felis. Cras orci diam, molestie vel sollicitudin id, venenatis ac tortor. Etiam quis dui lorem. Vestibulum sed turpis fringilla, sollicitudin velit at, faucibus diam. Quisque suscipit varius leo, porta scelerisque risus tincidunt nec. Etiam vehicula tellus sodales ornare ultricies. Integer lacinia mauris mauris, sit amet aliquet metus porttitor nec. Nullam cursus vulputate justo, at interdum felis semper in. Suspendisse elementum diam sit amet neque porttitor gravida. Donec suscipit, turpis quis ornare egestas, ligula ipsum pellentesque nisl, et facilisis libero lorem vitae mauris. Nulla nulla massa, molestie at semper id, vestibulum eget ipsum. Donec sollicitudin nisi eu arcu consequat, ut venenatis dolor sodales. Proin fermentum elementum sagittis. Phasellus egestas a sem sit amet fringilla.

      Aenean ante arcu, interdum et molestie sed, luctus eu ex. Aliquam vel finibus ligula. Proin consequat viverra efficitur. Pellentesque eu lectus libero. Nullam pulvinar faucibus elit, sit amet pulvinar orci venenatis ac. Suspendisse potenti. Nam placerat nisl est, non facilisis massa scelerisque ac. Nunc vulputate urna velit, eget varius dolor fermentum et. Quisque facilisis lectus sed convallis rhoncus. Sed quam leo, condimentum at luctus vel, tincidunt eu justo. Etiam vitae urna fringilla, imperdiet ante vel, blandit est. Sed mauris ex, eleifend sed dictum quis, bibendum et velit. Nulla facilisi. Fusce leo mi, fermentum eu lobortis eu, placerat vitae felis. Curabitur at ultrices purus.

      Donec mollis consequat magna ut gravida. Etiam lorem arcu, imperdiet a felis vel, ultrices maximus lectus. Integer tincidunt vel dolor non vulputate. Quisque ac posuere velit, eu vehicula risus. Nulla eget nisl finibus leo commodo suscipit sed vitae nulla. Pellentesque sit amet nunc id orci finibus mattis sed quis mi. Aenean sit amet magna id nibh rutrum iaculis.

      Nunc arcu leo, varius elementum est eu, imperdiet rutrum quam. Etiam ex nulla, auctor ac quam ut, finibus imperdiet est. Integer et venenatis enim, non feugiat odio. Vivamus leo urna, commodo a elit ac, accumsan tempor lectus. Fusce hendrerit faucibus enim quis porttitor. Morbi malesuada metus id lorem egestas pretium. Proin nec interdum sem, eget euismod nibh. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus eleifend nunc et porta pellentesque.

      Phasellus pretium, ligula in aliquam hendrerit, sem urna euismod nibh, id condimentum massa nisl nec massa. Sed eu tellus fermentum, sollicitudin lacus at, varius augue. In volutpat scelerisque iaculis. Praesent a dignissim dui. Aliquam eget turpis ut urna venenatis accumsan. Aenean ut imperdiet leo. Ut id sagittis sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus quis elementum augue. Proin vehicula tellus quam, ut porta metus vestibulum sed.

      Cras risus purus, porttitor id lorem sit amet, pulvinar porttitor dolor. Sed in tellus justo. Nullam porta ante in pulvinar maximus. Sed sed lobortis tortor. Quisque sed pharetra elit. Nunc molestie lacus enim, non semper leo volutpat a. Cras at vulputate nibh.

      Mauris efficitur efficitur turpis, aliquet rhoncus lectus. Sed pulvinar ipsum elit, ac ultrices purus cursus ut. Cras egestas leo tellus, et convallis ante aliquet non. Aliquam mollis in ligula ac fermentum. Donec venenatis semper magna nec pellentesque. Etiam consectetur, eros at vestibulum commodo, risus turpis placerat nulla, a tincidunt nunc erat sit amet diam. Proin porta at felis eu tincidunt. Phasellus luctus vitae quam vitae feugiat.

      Nullam lacinia efficitur lacus id lobortis. Duis eu sapien at dui cursus ullamcorper id nec turpis. Donec gravida molestie dui, sit amet laoreet tortor viverra ut. Aenean sit amet tortor sed felis ornare congue et vitae libero. Vestibulum condimentum, ligula sit amet molestie ullamcorper, lacus lacus cursus nisi, ut semper sapien lacus sit amet felis. Sed nec arcu egestas, mollis tortor sit amet, pharetra lacus. Nullam vitae ante et ipsum cursus sollicitudin. Mauris a magna dignissim, mollis erat et, pulvinar sapien. Sed arcu ex, venenatis ut sagittis a, porta vitae justo. Nam mi purus, pharetra eu est eget, aliquam dignissim lectus. Ut nec elit ipsum. Praesent pulvinar enim vitae diam fermentum ultricies.

      Nulla tristique interdum elementum. Vivamus a ante iaculis, fermentum metus aliquam, aliquam sapien. Vestibulum pellentesque tellus non neque imperdiet, id semper magna sodales. Mauris posuere maximus massa, nec iaculis sem consectetur et. Fusce non magna eu ipsum scelerisque tempus eget sed orci. Aliquam eu aliquam metus. Ut tincidunt magna in volutpat ultrices. Morbi vestibulum elit nec leo molestie porttitor quis non libero. Mauris eu auctor mauris. Phasellus vel efficitur quam. Etiam porta, arcu id feugiat fermentum, sem neque euismod mauris, eget tristique mi erat id mi. Proin vel sem porta, imperdiet leo at, maximus mi. Donec at urna sit amet purus lobortis facilisis fermentum a ex. Donec lacinia dolor a facilisis volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

      In hac habitasse platea dictumst. Sed egestas, augue vel suscipit blandit, risus tortor lacinia erat, non condimentum lectus felis eu risus. Nulla porttitor sagittis bibendum. Nullam quam sem, sagittis et urna sed, consequat blandit leo. Nunc in nunc vel odio fermentum venenatis. Ut consectetur vestibulum dolor, eget ultricies est feugiat non. Maecenas et pretium nisl. Donec varius pretium suscipit. Proin nec venenatis velit.
      `,
      questions: [] as QuestionModel[],
    },
    {
      id: 8,
      title: 'Final countdown',
      theory: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus urna felis, facilisis ut interdum et, auctor non felis. Cras orci diam, molestie vel sollicitudin id, venenatis ac tortor. Etiam quis dui lorem. Vestibulum sed turpis fringilla, sollicitudin velit at, faucibus diam. Quisque suscipit varius leo, porta scelerisque risus tincidunt nec. Etiam vehicula tellus sodales ornare ultricies. Integer lacinia mauris mauris, sit amet aliquet metus porttitor nec. Nullam cursus vulputate justo, at interdum felis semper in. Suspendisse elementum diam sit amet neque porttitor gravida. Donec suscipit, turpis quis ornare egestas, ligula ipsum pellentesque nisl, et facilisis libero lorem vitae mauris. Nulla nulla massa, molestie at semper id, vestibulum eget ipsum. Donec sollicitudin nisi eu arcu consequat, ut venenatis dolor sodales. Proin fermentum elementum sagittis. Phasellus egestas a sem sit amet fringilla.

      Aenean ante arcu, interdum et molestie sed, luctus eu ex. Aliquam vel finibus ligula. Proin consequat viverra efficitur. Pellentesque eu lectus libero. Nullam pulvinar faucibus elit, sit amet pulvinar orci venenatis ac. Suspendisse potenti. Nam placerat nisl est, non facilisis massa scelerisque ac. Nunc vulputate urna velit, eget varius dolor fermentum et. Quisque facilisis lectus sed convallis rhoncus. Sed quam leo, condimentum at luctus vel, tincidunt eu justo. Etiam vitae urna fringilla, imperdiet ante vel, blandit est. Sed mauris ex, eleifend sed dictum quis, bibendum et velit. Nulla facilisi. Fusce leo mi, fermentum eu lobortis eu, placerat vitae felis. Curabitur at ultrices purus.

      Donec mollis consequat magna ut gravida. Etiam lorem arcu, imperdiet a felis vel, ultrices maximus lectus. Integer tincidunt vel dolor non vulputate. Quisque ac posuere velit, eu vehicula risus. Nulla eget nisl finibus leo commodo suscipit sed vitae nulla. Pellentesque sit amet nunc id orci finibus mattis sed quis mi. Aenean sit amet magna id nibh rutrum iaculis.

      Nunc arcu leo, varius elementum est eu, imperdiet rutrum quam. Etiam ex nulla, auctor ac quam ut, finibus imperdiet est. Integer et venenatis enim, non feugiat odio. Vivamus leo urna, commodo a elit ac, accumsan tempor lectus. Fusce hendrerit faucibus enim quis porttitor. Morbi malesuada metus id lorem egestas pretium. Proin nec interdum sem, eget euismod nibh. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus eleifend nunc et porta pellentesque.

      Phasellus pretium, ligula in aliquam hendrerit, sem urna euismod nibh, id condimentum massa nisl nec massa. Sed eu tellus fermentum, sollicitudin lacus at, varius augue. In volutpat scelerisque iaculis. Praesent a dignissim dui. Aliquam eget turpis ut urna venenatis accumsan. Aenean ut imperdiet leo. Ut id sagittis sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus quis elementum augue. Proin vehicula tellus quam, ut porta metus vestibulum sed.

      Cras risus purus, porttitor id lorem sit amet, pulvinar porttitor dolor. Sed in tellus justo. Nullam porta ante in pulvinar maximus. Sed sed lobortis tortor. Quisque sed pharetra elit. Nunc molestie lacus enim, non semper leo volutpat a. Cras at vulputate nibh.

      Mauris efficitur efficitur turpis, aliquet rhoncus lectus. Sed pulvinar ipsum elit, ac ultrices purus cursus ut. Cras egestas leo tellus, et convallis ante aliquet non. Aliquam mollis in ligula ac fermentum. Donec venenatis semper magna nec pellentesque. Etiam consectetur, eros at vestibulum commodo, risus turpis placerat nulla, a tincidunt nunc erat sit amet diam. Proin porta at felis eu tincidunt. Phasellus luctus vitae quam vitae feugiat.

      Nullam lacinia efficitur lacus id lobortis. Duis eu sapien at dui cursus ullamcorper id nec turpis. Donec gravida molestie dui, sit amet laoreet tortor viverra ut. Aenean sit amet tortor sed felis ornare congue et vitae libero. Vestibulum condimentum, ligula sit amet molestie ullamcorper, lacus lacus cursus nisi, ut semper sapien lacus sit amet felis. Sed nec arcu egestas, mollis tortor sit amet, pharetra lacus. Nullam vitae ante et ipsum cursus sollicitudin. Mauris a magna dignissim, mollis erat et, pulvinar sapien. Sed arcu ex, venenatis ut sagittis a, porta vitae justo. Nam mi purus, pharetra eu est eget, aliquam dignissim lectus. Ut nec elit ipsum. Praesent pulvinar enim vitae diam fermentum ultricies.

      Nulla tristique interdum elementum. Vivamus a ante iaculis, fermentum metus aliquam, aliquam sapien. Vestibulum pellentesque tellus non neque imperdiet, id semper magna sodales. Mauris posuere maximus massa, nec iaculis sem consectetur et. Fusce non magna eu ipsum scelerisque tempus eget sed orci. Aliquam eu aliquam metus. Ut tincidunt magna in volutpat ultrices. Morbi vestibulum elit nec leo molestie porttitor quis non libero. Mauris eu auctor mauris. Phasellus vel efficitur quam. Etiam porta, arcu id feugiat fermentum, sem neque euismod mauris, eget tristique mi erat id mi. Proin vel sem porta, imperdiet leo at, maximus mi. Donec at urna sit amet purus lobortis facilisis fermentum a ex. Donec lacinia dolor a facilisis volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

      In hac habitasse platea dictumst. Sed egestas, augue vel suscipit blandit, risus tortor lacinia erat, non condimentum lectus felis eu risus. Nulla porttitor sagittis bibendum. Nullam quam sem, sagittis et urna sed, consequat blandit leo. Nunc in nunc vel odio fermentum venenatis. Ut consectetur vestibulum dolor, eget ultricies est feugiat non. Maecenas et pretium nisl. Donec varius pretium suscipit. Proin nec venenatis velit.
      `,
      questions: [] as QuestionModel[],
    },
  ] as QuizModel[];

  public fakeHistory = [
    { id: 1, userId: 1, quizId: 1, score: 5, total: 10 },
    { id: 2, userId: 1, quizId: 1, score: 8, total: 10 },
    { id: 3, userId: 1, quizId: 1, score: 2, total: 12 },
    { id: 4, userId: 1, quizId: 2, score: 5, total: 10 },
    { id: 5, userId: 1, quizId: 2, score: 2, total: 6 },
    { id: 6, userId: 1, quizId: 2, score: 4, total: 5 },
    { id: 7, userId: 1, quizId: 3, score: 1, total: 10 },
    { id: 8, userId: 1, quizId: 3, score: 5, total: 7 },
    { id: 9, userId: 1, quizId: 3, score: 5, total: 8 },
  ] as UserQuizSolutionModel[];

  public getLoggedUser(): UserModel {
    const loggedUserJson = localStorage.getItem('loggedUser');
    if (loggedUserJson) {
      return JSON.parse(loggedUserJson);
    }
    return null;
  }

  public setLoggedUser(loggedUser: UserModel): void {
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
  }

  public signUpUser(username: string, password: string): Observable<UserModel> {
    const user = {
      id: this.mockedUsers.length,
      username: username,
      password: null,
      isAdmin: false,
    } as UserModel;
    this.mockedUsers.push(user);

    return of(user);

    // return this.post(`${this.apiUrl}/user`, {
    //   username: username,
    //   password: password,
    // });
  }

  public loginUser(username: string, password: string): Observable<UserModel> {
    const user = this.mockedUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      return of(user);
    }
    return of(new UserModel());
    // return this.post(`${this.apiUrl}/user/login`, {
    //   username: username,
    //   password: password,
    // });
  }

  public grantAdmin(userId: number): Observable<void> {
    const index = this.mockedUsers.findIndex((u) => u.id === userId);
    if (index >= 0) {
      this.mockedUsers[index].isAdmin = true;
    }

    return of();
    // return this.put(`${this.apiUrl}/user/grant-admin/${userId}`, null);
  }

  public getNonAdminUsers(): Observable<UserModel[]> {
    return of(this.mockedUsers.filter((u) => !u.isAdmin));
    // return this.get(`${this.apiUrl}/user/non-admin`);
  }

  public getQuizes(): Observable<QuizModel[]> {
    return of(this.mockedQuizzes);
    // return this.get(`${this.apiUrl}/quiz`);
  }

  public getQuizById(quizId: number): Observable<QuizModel> {
    return of(this.mockedQuizzes.find((q) => q.id === quizId));
    // return this.get(`${this.apiUrl}/quiz/${quizId}`);
  }

  public getUserHistory(
    userId: number,
    quizId: number
  ): Observable<UserQuizSolutionModel[]> {
    return of(
      this.fakeHistory.filter(
        (uqs) => uqs.userId === userId && uqs.quizId === quizId
      )
    );
    // return this.get(`${this.apiUrl}/solution/user/${userId}/quiz/${quizId}`);
  }

  public addSolution(solution: UserQuizSolutionModel): Observable<void> {
    this.fakeHistory.push(solution);
    return of();
    // return this.post(`${this.apiUrl}/solution`, solution);
  }

  public addQuestion(
    quizId: number,
    statement: string,
    answers: AnswerModel[]
  ): Observable<QuestionModel> {
    const generatedQuestionId =
      this.mockedQuizzes
        .find((q) => q.id === quizId)
        .questions.reduce((a, b) => Math.max(a, b.id), -Infinity) + 1;
    return of({
      id: generatedQuestionId,
      statement: statement,
      answers: answers.map((answer, index) => {
        return {
          id: index + 1,
          statement: answer.statement,
          isCorrect: answer.isCorrect,
          displayOrder: index + 1,
        } as AnswerModel;
      }),
    } as QuestionModel);
    // return this.post(`${this.apiUrl}/question`, {
    //   quizId: quizId,
    //   statement: statement,
    //   answers: answers,
    // });
  }

  public deleteQuestion(questionId: number): Observable<void> {
    return of();
    // return this.delete(`${this.apiUrl}/question/${questionId}`);
  }

  private get(url: string): Observable<any> {
    const options = {};

    return this.httpClient.get(url, options).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  private post(url: string, data: any, responseType = 'json'): Observable<any> {
    return this.doPost(url, data, responseType);
  }

  private put(url: string, data: any): Observable<any> {
    return this.doPut(url, data);
  }

  private delete(url: string): Observable<any> {
    return this.httpClient.delete(url);
  }

  private doPost(url: string, data: any, responseType: any): Observable<any> {
    const options = {};

    options['responseType'] = responseType;

    return this.httpClient.post(url, data, options).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  private doPut(url: string, data: any): Observable<any> {
    const options = {};
    return this.httpClient.put(url, data, options).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Client side network error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        'Backend - ' +
          `status: ${error.status}, ` +
          `statusText: ${error.statusText}, ` +
          `message: ${error.message}`
      );
    }

    // return an observable with a user-facing error message
    return throwError(error);
  }
}
