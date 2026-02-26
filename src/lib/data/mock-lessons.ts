import type { LessonContent } from "@/lib/types";

type MockLesson = LessonContent & {
  id: string;
  scheduledDate: string;
  isPublished: boolean;
};

const johnLessons: MockLesson[] = [
  // ==================== LESSON 1 ====================
  {
    id: "1",
    version: 1,
    title: "In the Beginning Was the Word",
    subtitle: "The Gospel of John Begins",
    date: "2026-04-05",
    scheduledDate: "2026-04-05",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 1:1-14",
    },
    blocks: [
      {
        type: "context",
        content:
          "John the apostle wrote this Gospel late in his life. He was one of the twelve disciples and walked with Jesus for three years. He begins his Gospel at the very beginning of all things, before the world was made. John was known as the disciple whom Jesus loved. He had a close and tender relationship with the Lord.\n\nWhen he sat down to write about Jesus, he did not start with the birth in Bethlehem. He went all the way back to eternity past. In doing so, John shows us something wonderful. Jesus did not begin at the manger. He has always existed. He was there before the stars were set in the sky, before the oceans were filled, before the first breath of life was given to man.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "In the beginning was the Word, and the Word was with God, and the Word was God. The same was in the beginning with God. All things were made by him; and without him was not any thing made that was made. In him was life; and the life was the light of men. And the light shineth in darkness; and the darkness comprehended it not.",
        reference: "John 1:1-5",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "John calls Jesus \"the Word.\" A word is how we express what is in our heart and mind. Jesus is how God expressed Himself to us. Through Jesus, we can know what God is like. Notice that John says the Word \"was God.\" Jesus is fully and completely God. He was not created. He has always been.\n\nEverything that exists was made through Him. There is nothing in all of creation that came into being apart from His power. John also tells us that in Jesus there is life, and that life is the light of men. In a dark world full of sorrow and confusion, Jesus shines as a light. The darkness has never been able to overcome that light, and it never will.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "What does it mean to you that Jesus is called \"the Word\" of God? How does that help you understand who He is?\n\nJohn tells us that Jesus is the light shining in the darkness. When has the light of Christ brought comfort or hope to you during a difficult time?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "He was in the world, and the world was made by him, and the world knew him not. He came unto his own, and his own received him not. But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name: Which were born, not of blood, nor of the will of the flesh, nor of the will of man, but of God. And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.",
        reference: "John 1:10-14",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Here is the heart of the good news. The God who made the universe came down to live among us. The Word was made flesh. Jesus took on a human body and walked on the same dusty roads we walk on. He felt hunger, thirst, weariness, and sorrow. Many people did not recognize Him. The very world He had made did not know Him. Even His own people, the nation of Israel, largely turned away from Him. Yet He came anyway, because His love was greater than any rejection.\n\nBut to everyone who did receive Him and believe in His name, He gave the right to become children of God. This is a gift offered freely. We do not earn it by our own effort. We simply receive it by faith, trusting in who Jesus is and what He has done for us.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "The Word was made flesh and dwelt among us. What does it mean to you that God Himself chose to come and live as one of us?\n\nJohn says that to all who received Jesus, He gave the power to become children of God. How does knowing you are a child of God bring you peace and security?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, take a moment each morning to thank God that Jesus, the living Word, chose to come and dwell among us. When you open your Bible or hear a Scripture read aloud, remember that these words point to a Person who loves you and gave Himself for you. Let that truth bring warmth and comfort to your heart each day.",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "What does it mean to you that Jesus is called \"the Word\" of God? How does that help you understand who He is?",
      "John tells us that Jesus is the light shining in the darkness. When has the light of Christ brought comfort or hope to you during a difficult time?",
      "The Word was made flesh and dwelt among us. What does it mean to you that God Himself chose to come and live as one of us?",
      "John says that to all who received Jesus, He gave the power to become children of God. How does knowing you are a child of God bring you peace and security?",
    ],
  },
  // ==================== LESSON 2 ====================
  {
    id: "2",
    version: 1,
    title: "Behold the Lamb of God",
    subtitle: "John the Baptist Points to Jesus",
    date: "2026-04-12",
    scheduledDate: "2026-04-12",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 1:19-34",
    },
    blocks: [
      {
        type: "context",
        content:
          "John the Baptist was a prophet sent by God to prepare the way for Jesus. He lived simply in the wilderness and called people to repent and be baptized. Many came from all over Judea to hear him. He wore clothing made of camel's hair and ate locusts and wild honey. He lived apart from the comforts of the world so he could focus on the message God had given him.\n\nPeople traveled great distances to hear him preach by the Jordan River. The religious leaders in Jerusalem took notice. They sent priests and Levites to find out who this man was and by what authority he was speaking. John's answer surprised them all.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "And this is the record of John, when the Jews sent priests and Levites from Jerusalem to ask him, Who art thou? And he confessed, and denied not; but confessed, I am not the Christ. And they asked him, What then? Art thou Elias? And he saith, I am not. Art thou that prophet? And he answered, No. Then said they unto him, Who art thou? that we may give an answer to them that sent us. What sayest thou of thyself? He said, I am the voice of one crying in the wilderness, Make straight the way of the Lord, as said the prophet Esaias.",
        reference: "John 1:19-23",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "The religious leaders wanted to put a label on John. They asked if he was the Christ, or Elijah, or the great prophet Moses had promised. John said no to each one. He was not interested in drawing attention to himself. When they pressed him further, John quoted the prophet Isaiah. He called himself simply \"a voice.\" His whole purpose was to point people toward someone greater.\n\nHe was preparing the road so that when Jesus arrived, people would be ready to receive Him. There is a beautiful lesson in John's humility. He knew exactly who he was and who he was not. He was content to be a voice that pointed others to the Lord. He found his joy in fulfilling the role God had given him.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "John the Baptist called himself simply \"a voice\" pointing others to Jesus. What can we learn from his humility and willingness to serve in the background?\n\nHave you ever had a time when someone helped you draw closer to Jesus? What did that person do or say that made a difference?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "The next day John seeth Jesus coming unto him, and saith, Behold the Lamb of God, which taketh away the sin of the world. This is he of whom I said, After me cometh a man which is preferred before me: for he was before me. And I knew him not: but that he should be made manifest to Israel, therefore am I come baptizing with water. And John bare record, saying, I saw the Spirit descending from heaven like a dove, and it abode upon him. And I knew him not: but he that sent me to baptize with water, the same said unto me, Upon whom thou shalt see the Spirit descending, and remaining on him, the same is he which baptizeth with the Holy Ghost. And I saw, and bare record that this is the Son of God.",
        reference: "John 1:29-34",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "When John saw Jesus approaching, he spoke some of the most important words in all of Scripture: \"Behold the Lamb of God, which taketh away the sin of the world.\" Every Jewish person listening would have understood this. They knew about the Passover lamb whose blood protected the people of Israel in Egypt. They knew about the lambs offered at the temple for the forgiveness of sins. John was saying that Jesus is the one true sacrifice that all those lambs had been pointing to. He is the final and perfect Lamb. His sacrifice would take away sin once and for all.\n\nGod also gave John a special sign to confirm who Jesus was. He saw the Holy Spirit come down from heaven like a dove and rest upon Jesus. This was the sign God had promised him. From that moment, John declared with certainty: \"This is the Son of God.\"",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "John called Jesus \"the Lamb of God, which taketh away the sin of the world.\" What does that title mean to you personally?\n\nGod gave John a sign to confirm who Jesus was. Can you think of a time when God gave you a clear confirmation or assurance about something in your faith?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, look for one opportunity each day to point someone toward Jesus, even in a small way. It might be a kind word of encouragement, sharing a favorite verse, or simply telling someone that God loves them. Like John the Baptist, we can be a voice that helps others see the Lamb of God.",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "John the Baptist called himself simply \"a voice\" pointing others to Jesus. What can we learn from his humility and willingness to serve in the background?",
      "Have you ever had a time when someone helped you draw closer to Jesus? What did that person do or say that made a difference?",
      "John called Jesus \"the Lamb of God, which taketh away the sin of the world.\" What does that title mean to you personally?",
      "God gave John a sign to confirm who Jesus was. Can you think of a time when God gave you a clear confirmation or assurance about something in your faith?",
    ],
  },
  // ==================== LESSON 3 ====================
  {
    id: "3",
    version: 1,
    title: "Come and See",
    subtitle: "Jesus Calls His First Disciples",
    date: "2026-04-19",
    scheduledDate: "2026-04-19",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 1:35-51",
    },
    blocks: [
      {
        type: "context",
        content:
          "After John the Baptist pointed people to Jesus, some of his own followers went to see Jesus for themselves. This is how the first disciples were called. They were ordinary working men from the region of Galilee.\n\nIn those days, a rabbi would choose his students carefully. The students, called disciples, would leave their homes and jobs to follow their teacher everywhere. They would learn by watching, listening, and imitating the way their rabbi lived. What makes this story so wonderful is how personal and gentle Jesus was in calling each one. He did not stand on a stage and give a grand speech. He met them one by one, face to face, and invited them to walk with Him.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "Again the next day after John stood, and two of his disciples; And looking upon Jesus as he walked, he saith, Behold the Lamb of God! And the two disciples heard him speak, and they followed Jesus. Then Jesus turned, and saw them following, and saith unto them, What seek ye? They said unto him, Rabbi, (which is to say, being interpreted, Master,) where dwellest thou? He saith unto them, Come and see. They came and saw where he dwelt, and abode with him that day: for it was about the tenth hour. One of the two which heard John speak, and followed him, was Andrew, Simon Peter's brother. He first findeth his own brother Simon, and saith unto him, We have found the Messias, which is, being interpreted, the Christ. And he brought him to Jesus. And when Jesus beheld him, he said, Thou art Simon the son of Jona: thou shalt be called Cephas, which is by interpretation, A stone.",
        reference: "John 1:35-42",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Notice what Jesus said to these two men who were following Him: \"What seek ye?\" He asked them a simple, honest question. He wanted to know what was on their hearts. And when they asked where He was staying, He gave them the warmest invitation: \"Come and see.\" They spent the rest of that day with Jesus. We are not told everything they talked about, but whatever happened in those hours changed their lives forever.\n\nAndrew was so moved that the first thing he did was find his brother Simon and bring him to Jesus. When Jesus looked at Simon, He saw more than a fisherman. He gave him a new name: Cephas, which means \"a stone\" or \"a rock.\" Jesus saw what Simon would become by the grace of God. He sees the same potential in each one of us.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus asked the two disciples, \"What seek ye?\" If Jesus asked you that same question today, what would your answer be?\n\nAndrew's first response after meeting Jesus was to go find his brother and bring him along. Who was the person that first brought you to Jesus or helped you grow in your faith?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "The day following Jesus would go forth into Galilee, and findeth Philip, and saith unto him, Follow me. Now Philip was of Bethsaida, the city of Andrew and Peter. Philip findeth Nathanael, and saith unto him, We have found him, of whom Moses in the law, and the prophets, did write, Jesus of Nazareth, the son of Joseph. And Nathanael said unto him, Can there any good thing come out of Nazareth? Philip saith unto him, Come and see. Jesus saw Nathanael coming to him, and saith of him, Behold an Israelite indeed, in whom is no guile! Nathanael saith unto him, Whence knowest thou me? Jesus answered and said unto him, Before that Philip called thee, when thou wast under the fig tree, I saw thee. Nathanael answered and saith unto him, Rabbi, thou art the Son of God; thou art the King of Israel. Jesus answered and said unto him, Because I said unto thee, I saw thee under the fig tree, believest thou? thou shalt see greater things than these. And he saith unto him, Verily, verily, I say unto you, Hereafter ye shall see heaven open, and the angels of God ascending and descending upon the Son of man.",
        reference: "John 1:43-51",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Philip's response to finding Jesus was the same as Andrew's. He went and told someone else. He found Nathanael and shared the good news. When Nathanael was skeptical about anything good coming from Nazareth, Philip did not argue with him. He simply said, \"Come and see.\" That is one of the most powerful invitations we can ever give.\n\nWhen Nathanael arrived, Jesus greeted him with a compliment: \"Behold an Israelite indeed, in whom is no guile!\" Jesus saw his honest and sincere heart. Then Jesus revealed something that stunned Nathanael. He told him that He had seen him sitting under the fig tree before Philip ever called him. This showed Nathanael that Jesus had supernatural knowledge. He knew things that only God could know. Nathanael immediately declared, \"Thou art the Son of God; thou art the King of Israel.\" And Jesus promised him that he would see even greater things in the days ahead.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Philip did not argue with Nathanael's doubts. He simply said, \"Come and see.\" Why do you think a personal invitation is so powerful when sharing faith with others?\n\nJesus saw Nathanael under the fig tree before they ever met. How does it comfort you to know that Jesus sees you and knows you completely?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, think of one person you could invite to \"come and see\" what Jesus is like. It could be as simple as inviting someone to a Bible study, a church service, or a conversation about faith. Like Andrew and Philip, we do not need to have all the answers. We simply need to bring people to Jesus and let Him do the rest.",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Jesus asked the two disciples, \"What seek ye?\" If Jesus asked you that same question today, what would your answer be?",
      "Andrew's first response after meeting Jesus was to go find his brother and bring him along. Who was the person that first brought you to Jesus or helped you grow in your faith?",
      "Philip did not argue with Nathanael's doubts. He simply said, \"Come and see.\" Why do you think a personal invitation is so powerful when sharing faith with others?",
      "Jesus saw Nathanael under the fig tree before they ever met. How does it comfort you to know that Jesus sees you and knows you completely?",
    ],
  },
  // ==================== LESSON 4 ====================
  {
    id: "4",
    version: 1,
    title: "The Wedding at Cana",
    subtitle: "Jesus Performs His First Miracle",
    date: "2026-04-26",
    scheduledDate: "2026-04-26",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 2:1-11",
    },
    blocks: [
      {
        type: "context",
        content:
          "Jewish weddings in ancient Israel were joyful celebrations that lasted several days. The whole community came together. Running out of wine would have been a serious embarrassment for the family. Weddings were among the happiest occasions in the life of a village.\n\nFamilies saved for years to provide a generous feast for their guests. Hospitality was a sacred duty, and to run short on provisions would bring lasting shame to the bride and groom's families. Jesus and His mother Mary were both invited to this wedding in the small town of Cana, which was in the hill country of Galilee. His disciples came along as well. It was in this joyful, everyday setting that Jesus chose to reveal His glory for the very first time.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "And the third day there was a marriage in Cana of Galilee; and the mother of Jesus was there: And both Jesus was called, and his disciples, to the marriage. And when they wanted wine, the mother of Jesus saith unto him, They have no wine. Jesus saith unto her, Woman, what have I to do with thee? mine hour is not yet come. His mother saith unto the servants, Whatsoever he saith unto you, do it.",
        reference: "John 2:1-5",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "When the wine ran out, Mary turned to Jesus. She did not tell Him what to do. She simply brought the need to His attention: \"They have no wine.\" This is a beautiful picture of how we can pray. We bring our needs to the Lord and trust Him to act in His own way and time.\n\nJesus replied by saying, \"Mine hour is not yet come.\" He was speaking of the greater plan the Father had for revealing who He was. Yet Mary had such confidence in her son that she told the servants, \"Whatsoever he saith unto you, do it.\" Those words from Mary are some of the wisest counsel in all of Scripture. Whatever Jesus tells us to do, we should do it. Even when we do not understand the reason, we can trust that He knows what is best.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Mary brought her need to Jesus simply by saying, \"They have no wine.\" She did not tell Him how to fix it. How does her example encourage you in the way you bring your own needs to God in prayer?\n\nMary told the servants, \"Whatsoever he saith unto you, do it.\" Has there been a time in your life when you followed the Lord's direction even though you did not fully understand why?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "And there were set there six waterpots of stone, after the manner of the purifying of the Jews, containing two or three firkins apiece. Jesus saith unto them, Fill the waterpots with water. And they filled them up to the brim. And he saith unto them, Draw out now, and bear unto the governor of the feast. And they bare it. When the ruler of the feast had tasted the water that was made wine, and knew not whence it was: (but the servants which drew the water knew;) the governor of the feast called the bridegroom, And saith unto him, Every man at the beginning doth set forth good wine; and when men have well drunk, then that which is worse: but thou hast kept the good wine until now. This beginning of miracles did Jesus in Cana of Galilee, and manifested forth his glory; and his disciples believed on him.",
        reference: "John 2:6-11",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Jesus told the servants to fill six large stone waterpots with water. Each pot held twenty to thirty gallons. That is over a hundred gallons of water in all. Then He told them to draw some out and take it to the master of the feast. When the master tasted it, he was amazed. It was the finest wine he had ever tasted.\n\nThe master of the feast did not know where the wine had come from, but the servants knew. They had filled those pots with plain water. They had seen the miracle happen with their own eyes. Jesus took something ordinary and made it extraordinary. John tells us this was the first of the signs Jesus performed. Through this miracle, He revealed His glory, and His disciples put their faith in Him. Jesus showed that He is the Lord over all creation, able to transform the simplest things into something beautiful and abundant.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus turned plain water into the finest wine. Have you ever seen God take something ordinary in your life and turn it into something beautiful or unexpected?\n\nThe servants obeyed Jesus even though His instructions must have seemed strange. What can we learn from their willingness to trust and obey?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, bring one specific need to the Lord in prayer each day. It does not have to be something large or dramatic. Like Mary at the wedding, simply tell Jesus what the need is and trust Him to respond in His own way and time. Watch for how He works, and thank Him for His faithfulness.",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Mary brought her need to Jesus simply by saying, \"They have no wine.\" She did not tell Him how to fix it. How does her example encourage you in the way you bring your own needs to God in prayer?",
      "Mary told the servants, \"Whatsoever he saith unto you, do it.\" Has there been a time in your life when you followed the Lord's direction even though you did not fully understand why?",
      "Jesus turned plain water into the finest wine. Have you ever seen God take something ordinary in your life and turn it into something beautiful or unexpected?",
      "The servants obeyed Jesus even though His instructions must have seemed strange. What can we learn from their willingness to trust and obey?",
    ],
  },
  // ==================== LESSON 5 ====================
  {
    id: "5",
    version: 1,
    title: "You Must Be Born Again",
    subtitle: "Jesus Teaches Nicodemus",
    date: "2026-05-03",
    scheduledDate: "2026-05-03",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 3:1-17",
    },
    blocks: [
      {
        type: "context",
        content:
          "Nicodemus was a Pharisee and a member of the Jewish ruling council called the Sanhedrin. He was a well-educated man who studied the Scriptures. He came to Jesus at night, likely because he did not want the other religious leaders to know.\n\nThe Pharisees were a group of devout Jewish men who dedicated their lives to keeping every detail of God's law. They were respected and honored by the people. Nicodemus held a high position among them, and he was known as a teacher of Israel. Yet for all his learning and religious devotion, Nicodemus sensed that something was missing. He had seen the signs Jesus performed, and he knew that no one could do such things unless God was with Him. So he came to Jesus with an open and searching heart.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "There was a man of the Pharisees, named Nicodemus, a ruler of the Jews: The same came to Jesus by night, and said unto him, Rabbi, we know that thou art a teacher come from God: for no man can do these miracles that thou doest, except God be with him. Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God. Nicodemus saith unto him, How can a man be born when he is old? can he enter the second time into his mother's womb, and be born? Jesus answered, Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God. That which is born of the flesh is flesh; and that which is born of the Spirit is spirit. Marvel not that I said unto thee, Ye must be born again. The wind bloweth where it listeth, and thou hearest the sound thereof, but canst not tell whence it cometh, and whither it goeth: so is every one that is born of the Spirit.",
        reference: "John 3:1-8",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Nicodemus came with a compliment, but Jesus went straight to the heart of the matter. He told Nicodemus that a person must be \"born again\" to see the kingdom of God. This confused Nicodemus. He thought in physical terms and asked how an old man could be born a second time.\n\nJesus explained that He was talking about a spiritual birth. Our first birth gives us physical life. The new birth gives us spiritual life through the Holy Spirit. This is something God does in us. We cannot manufacture it on our own through good works, religious rituals, or education. Jesus compared the Spirit's work to the wind. You can hear the wind and see its effects, but you cannot control where it comes from or where it goes. The new birth is a mysterious and powerful work of God in the human heart. It changes us from the inside out.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus told Nicodemus that a person must be \"born again\" to see the kingdom of God. What does the idea of being born again mean to you in your own life of faith?\n\nJesus compared the Holy Spirit to the wind. You cannot see the wind, but you can feel it and see what it does. How have you experienced the quiet work of the Holy Spirit in your life?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up: That whosoever believeth in him should not perish, but have eternal life. For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life. For God sent not his Son into the world to condemn the world; but that the world through him might be saved.",
        reference: "John 3:14-17",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Jesus reminded Nicodemus of a story from the book of Numbers. When the people of Israel were bitten by serpents in the wilderness, God told Moses to lift up a bronze serpent on a pole. Anyone who looked at it in faith was healed. In the same way, Jesus said that He would be lifted up so that everyone who believes in Him would have eternal life.\n\nThen Jesus spoke what may be the most beloved verse in all the Bible: \"For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.\" The heart of God is love. He gave His most precious gift so that we could be forgiven and live forever with Him. Jesus also made clear that He did not come to condemn the world. He came to save it. God's purpose in sending His Son was rescue and redemption. No matter who we are, no matter what we have done, the invitation to believe and receive eternal life is open to everyone.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "John 3:16 is one of the most well-known verses in the Bible. Which word or phrase in that verse stands out to you the most, and why?\n\nJesus said He came to save the world, not to condemn it. How does that truth change the way you think about God's heart toward you and toward others?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, spend a few quiet minutes each day reflecting on John 3:16. You may want to say it aloud slowly, pausing after each phrase. Let the truth of God's great love settle deep into your heart. If you know someone who is searching for peace or purpose, consider sharing this verse with them as a word of hope and comfort.",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Jesus told Nicodemus that a person must be \"born again\" to see the kingdom of God. What does the idea of being born again mean to you in your own life of faith?",
      "Jesus compared the Holy Spirit to the wind. You cannot see the wind, but you can feel it and see what it does. How have you experienced the quiet work of the Holy Spirit in your life?",
      "John 3:16 is one of the most well-known verses in the Bible. Which word or phrase in that verse stands out to you the most, and why?",
      "Jesus said He came to save the world, not to condemn it. How does that truth change the way you think about God's heart toward you and toward others?",
    ],
  },
  // ==================== LESSON 6 ====================
  {
    id: "6",
    version: 1,
    title: "Living Water",
    subtitle: "Jesus and the Woman at the Well",
    date: "2026-05-10",
    scheduledDate: "2026-05-10",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 4:7-30",
      additional: ["John 4:39-42"],
    },
    blocks: [
      {
        type: "context",
        content:
          "Jews and Samaritans had avoided each other for hundreds of years. Most Jewish travelers would walk miles out of their way to go around Samaria. Jesus chose to go straight through. He stopped at a well near the town of Sychar, where He met a Samaritan woman who had come to draw water.\n\nThis well had a long history. It was called Jacob's well because the patriarch Jacob had dug it centuries before. It was a place where families had gathered for generations. The woman came to the well at noon, the hottest part of the day. Most women drew water in the cool of the morning. She may have been coming alone to avoid the stares and whispers of others in the town. Jesus was waiting there, and He spoke to her.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "There cometh a woman of Samaria to draw water: Jesus saith unto her, Give me to drink. (For his disciples were gone away unto the city to buy meat.) Then saith the woman of Samaria unto him, How is it that thou, being a Jew, askest drink of me, which am a woman of Samaria? for the Jews have no dealings with the Samaritans. Jesus answered and said unto her, If thou knewest the gift of God, and who it is that saith to thee, Give me to drink; thou wouldest have asked of him, and he would have given thee living water. The woman saith unto him, Sir, thou hast nothing to draw with, and the well is deep: from whence then hast thou that living water? Art thou greater than our father Jacob, which gave us the well, and drank thereof himself, and his children, and his cattle? Jesus answered and said unto her, Whosoever drinketh of this water shall thirst again: But whosoever drinketh of the water that I shall give him shall never thirst; but the water that I shall give him shall be in him a well of water springing up into everlasting life. The woman saith unto him, Sir, give me this water, that I thirst not, neither come hither to draw.",
        reference: "John 4:7-15",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "The woman was thinking about physical water. She was tired of coming to the well every single day in the heat. When Jesus talked about water that would take away thirst forever, she wanted some right away. But Jesus was talking about something deeper.\n\nThe living water He offered was the gift of eternal life through faith in Him. Every earthly thing we rely on will eventually leave us thirsty again. Only God can fill the deepest longing of the human heart.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus told the woman that anyone who drinks the water He gives will never thirst again. What are some of the things people turn to for satisfaction that always leave them wanting more?\n\nJesus started this conversation by asking the woman for a simple drink of water. How does His gentle and personal approach encourage you in the way you talk to others about faith?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "The woman saith unto him, I know that Messias cometh, which is called Christ: when he is come, he will tell us all things. Jesus saith unto her, I that speak unto thee am he. And upon this came his disciples, and marvelled that he talked with the woman: yet no man said, What seekest thou? or, Why talkest thou with her? The woman then left her waterpot, and went her way into the city, and saith to the men, Come, see a man, which told me all things that ever I did: is not this the Christ? Then they went out of the city, and came unto him.",
        reference: "John 4:25-30",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Notice what happened when the woman realized who Jesus was. She left her water pot sitting right there at the well. She had come for water, but she found something so much greater that she forgot all about it. She ran back to the very town where people knew her past and her mistakes. She was so full of joy and wonder that none of that mattered anymore.\n\nShe told everyone to come and see Jesus for themselves. Her simple testimony was powerful. She did not give a sermon. She simply said, \"Come, see a man, which told me all things that ever I did.\" Sometimes the best thing we can do is invite someone to meet Jesus.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "The woman left her water pot and ran to tell others about Jesus. Have you ever been so moved by an experience with God that you could not wait to share it?\n\nShe went back to the very people who knew her past. What does her courage tell us about the power of a changed heart?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "And many of the Samaritans of that city believed on him for the saying of the woman, which testified, He told me all that ever I did. So when the Samaritans were come unto him, they besought him that he would tarry with them: and he abode there two days. And many more believed because of his own word; And said unto the woman, Now we believe, not because of thy saying: for we have heard him ourselves, and know that this is indeed the Christ, the Saviour of the world.",
        reference: "John 4:39-42",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "The woman's testimony brought many people to Jesus. And once they heard Him for themselves, they believed even more deeply. They called Him \"the Saviour of the world.\" That title is especially beautiful because it came from Samaritans, people the religious leaders of the day had written off.\n\nJesus stayed with them for two full days. He did not rush away. He gave them His time and His presence. That is how He treats all of us. He meets us right where we are and stays with us. The living water Jesus offers is still available to every one of us today. No matter our past, no matter our mistakes, He invites us to drink and never thirst again.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "The Samaritans called Jesus \"the Saviour of the world.\" What does that title mean to you, knowing that His love reaches every person in every place?\n\nJesus stayed with the Samaritans for two full days. How does it comfort you to know that Jesus gives us His time and His presence?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, think about what you turn to when you feel empty or weary. Bring that need to Jesus in prayer. Ask Him to fill you with His living water, the peace and hope that only He can give. And if someone comes to mind who needs encouragement, share a kind word or a favorite Bible verse with them.",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Jesus told the woman that anyone who drinks the water He gives will never thirst again. What are some of the things people turn to for satisfaction that always leave them wanting more?",
      "Jesus started this conversation by asking the woman for a simple drink of water. How does His gentle and personal approach encourage you in the way you talk to others about faith?",
      "The woman left her water pot and ran to tell others about Jesus. Have you ever been so moved by an experience with God that you could not wait to share it?",
      "She went back to the very people who knew her past. What does her courage tell us about the power of a changed heart?",
      "The Samaritans called Jesus \"the Saviour of the world.\" What does that title mean to you, knowing that His love reaches every person in every place?",
      "Jesus stayed with the Samaritans for two full days. How does it comfort you to know that Jesus gives us His time and His presence?",
    ],
  },
  // ==================== LESSON 7 ====================
  {
    id: "7",
    version: 1,
    title: "The Healing at the Pool",
    subtitle: "Jesus Heals a Man Who Waited 38 Years",
    date: "2026-05-17",
    scheduledDate: "2026-05-17",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 5:1-15",
    },
    blocks: [
      {
        type: "context",
        content:
          "In Jerusalem, near the Sheep Gate, there was a pool called Bethesda. The name Bethesda means \"house of mercy.\" Around this pool lay a great number of sick, blind, and lame people. They were waiting for the water to be stirred, because there was a belief that when the water moved, the first person in would be healed.\n\nAmong the crowd was a man who had been unable to walk for thirty-eight years. That is a very long time to suffer. Many of us know what it is like to wait and hope for healing. This man had no one to help him into the pool when the water stirred. He had been overlooked and forgotten by those around him. But Jesus saw him lying there, and He already knew how long the man had been in that condition.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "After this there was a feast of the Jews; and Jesus went up to Jerusalem. Now there is at Jerusalem by the sheep market a pool, which is called in the Hebrew tongue Bethesda, having five porches. In these lay a great multitude of impotent folk, of blind, halt, withered, waiting for the moving of the water. For an angel went down at a certain season into the pool, and troubled the water: whosoever then first after the troubling of the water stepped in was made whole of whatsoever disease he had. And a certain man was there, which had an infirmity thirty and eight years. When Jesus saw him lie, and knew that he had been now a long time in that case, he saith unto him, Wilt thou be made whole? The impotent man answered him, Sir, I have no man, when the water is troubled, to put me into the pool: but while I am coming, another steppeth down before me. Jesus saith unto him, Rise, take up thy bed, and walk. And immediately the man was made whole, and took up his bed, and walked: and on the same day was the sabbath.",
        reference: "John 5:1-9",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Jesus asked the man a question that seems surprising: \"Wilt thou be made whole?\" Of course the man wanted to be healed. But Jesus wanted him to express his desire, to reach out in faith. The man's answer was honest and a little sad. He said he had no one to help him. He had been trying for years on his own, and someone always got to the water ahead of him.\n\nJesus did not ask the man to get to the pool. He did not require any special effort. He simply said, \"Rise, take up thy bed, and walk.\" And immediately, the man was healed. After thirty-eight years of waiting, healing came in a single moment through the power of Jesus' word. The man did not need the pool. He needed Jesus. Sometimes we look for help in many places, when what we truly need is to hear the voice of the Lord speaking into our situation.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus asked the man, \"Wilt thou be made whole?\" Why do you think Jesus asked this question when the answer seemed so obvious?\n\nThe man had been waiting thirty-eight years. Have you ever experienced a long season of waiting on God? What helped you keep your hope alive during that time?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "The Jews therefore said unto him that was cured, It is the sabbath day: it is not lawful for thee to carry thy bed. He answered them, He that made me whole, the same said unto me, Take up thy bed, and walk. Then asked they him, What man is that which said unto thee, Take up thy bed, and walk? And he that was healed wist not who it was: for Jesus had conveyed himself away, a multitude being in that place. Afterward Jesus findeth him in the temple, and said unto him, Behold, thou art made whole: sin no more, lest a worse thing come unto thee. The man departed, and told the Jews that it was Jesus, which had made him whole.",
        reference: "John 5:10-15",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "After the man was healed, the religious leaders were upset because it happened on the Sabbath. They focused on the rules instead of the miracle. They asked the man who had told him to carry his bed, but the man did not even know who Jesus was yet. Jesus had slipped away into the crowd.\n\nLater, Jesus found the man in the temple. Notice that word: Jesus found him. The Lord went looking for him. He cared about more than the man's physical healing. He cared about his whole person, body and soul. Jesus told him, \"Behold, thou art made whole: sin no more.\" He was inviting the man into a new way of living. Healing from Jesus touches every part of our lives. He wants to restore us completely.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "The religious leaders focused on rules instead of celebrating the miracle. Why do you think people sometimes miss what God is doing because they are focused on the wrong things?\n\nJesus went and found the man in the temple after healing him. What does this tell you about how Jesus cares for the whole person, and not only our physical needs?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, if you are waiting on God for something, take heart from this story. The man at the pool waited thirty-eight years, and Jesus came to him at the right moment. Bring your need to the Lord each day this week and trust His timing. Also, look around you for someone who may feel forgotten or overlooked, and offer them a word of kindness.",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Jesus asked the man, \"Wilt thou be made whole?\" Why do you think Jesus asked this question when the answer seemed so obvious?",
      "The man had been waiting thirty-eight years. Have you ever experienced a long season of waiting on God? What helped you keep your hope alive during that time?",
      "The religious leaders focused on rules instead of celebrating the miracle. Why do you think people sometimes miss what God is doing because they are focused on the wrong things?",
      "Jesus went and found the man in the temple after healing him. What does this tell you about how Jesus cares for the whole person, and not only our physical needs?",
    ],
  },
  // ==================== LESSON 8 ====================
  {
    id: "8",
    version: 1,
    title: "The Bread of Life",
    subtitle: "Jesus Feeds Five Thousand and Teaches About True Bread",
    date: "2026-05-24",
    scheduledDate: "2026-05-24",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 6:5-14, 35-40",
    },
    blocks: [
      {
        type: "context",
        content:
          "A great crowd had followed Jesus to the far side of the Sea of Galilee. They had seen the miracles He performed on those who were sick, and they wanted to be near Him. As the day went on, the people grew hungry, and there was no place nearby to buy food.\n\nJesus looked out at the crowd of thousands and asked Philip where they could buy bread for all these people. John tells us that Jesus already knew what He was going to do. He asked the question to test Philip's faith. Philip counted the cost and said that even two hundred denarii worth of bread would not be enough for everyone to have even a small piece. The situation seemed impossible from a human perspective. But with Jesus, nothing is impossible.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "When Jesus then lifted up his eyes, and saw a great company come unto him, he saith unto Philip, Whence shall we buy bread, that these may eat? And this he said to prove him: for he himself knew what he would do. Philip answered him, Two hundred pennyworth of bread is not sufficient for them, that every one of them may take a little. One of his disciples, Andrew, Simon Peter's brother, saith unto him, There is a lad here, which hath five barley loaves, and two small fishes: but what are they among so many? And Jesus said, Make the men sit down. Now there was much grass in the place. So the men sat down, in number about five thousand. And Jesus took the loaves; and when he had given thanks, he distributed to the disciples, and the disciples to them that were sat down; and likewise of the fishes as much as they would. When they were filled, he said unto his disciples, Gather up the fragments that remain, that nothing be lost. Therefore they gathered them together, and filled twelve baskets with the fragments of the five barley loaves, which remained over and above unto them that had eaten. Then those men, when they had seen the miracle that Jesus did, said, This is of a truth that prophet that should come into the world.",
        reference: "John 6:5-14",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Andrew found a boy with five barley loaves and two small fish. It was almost nothing compared to the need. But he brought it to Jesus. That small act of bringing what little they had made all the difference.\n\nJesus took the loaves, gave thanks, and began to distribute the food. Everyone ate until they were full. There were five thousand men, plus women and children. And when the meal was over, twelve baskets of leftovers were gathered up. Jesus took something small and multiplied it beyond anything anyone could have imagined. He is the God of abundance. He can take whatever we offer Him, no matter how small it seems, and use it for His glory.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "A young boy offered his small lunch, and Jesus used it to feed thousands. What does this teach us about offering what we have to God, even when it seems too small to matter?\n\nThere were twelve baskets of food left over after everyone was fed. What does this abundance tell you about the character of God?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "And Jesus said unto them, I am the bread of life: he that cometh to me shall never hunger; and he that believeth on me shall never thirst. But I said unto you, That ye also have seen me, and believe not. All that the Father giveth me shall come to me; and him that cometh to me I will in no wise cast out. For I came down from heaven, not to do mine own will, but the will of him that sent me. And this is the Father's will which hath sent me, that of all which he hath given me I should lose nothing, but should raise it up again at the last day. And this is the will of him that sent me, that every one which seeth the Son, and believeth on him, may have everlasting life: and I will raise him up at the last day.",
        reference: "John 6:35-40",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "After the miracle, Jesus taught the crowd a deeper truth. He said, \"I am the bread of life.\" The people had been fed physically, but Jesus wanted them to understand their deeper hunger. Our bodies need bread every day. In the same way, our souls need Jesus every day.\n\nThen He gave one of the most comforting promises in all of Scripture: \"Him that cometh to me I will in no wise cast out.\" That means no one who comes to Jesus will ever be turned away. He will never say, \"You are not welcome here.\" He will never say, \"You have done too much wrong.\" Everyone who comes to Him in faith is received with open arms. And He promises to raise us up on the last day. Our hope in Him stretches beyond this life into eternity.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus said, \"I am the bread of life.\" Just as our bodies need food each day, how do you nourish your soul with the presence of Jesus in your daily life?\n\nJesus promised, \"Him that cometh to me I will in no wise cast out.\" How does this promise bring you comfort and assurance today?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, each time you sit down for a meal, pause and give thanks. As you do, remember that Jesus is the bread of life who satisfies the deepest hunger of your soul. Ask Him to nourish your spirit each day, and trust His promise that He will never turn away anyone who comes to Him.",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "A young boy offered his small lunch, and Jesus used it to feed thousands. What does this teach us about offering what we have to God, even when it seems too small to matter?",
      "There were twelve baskets of food left over after everyone was fed. What does this abundance tell you about the character of God?",
      "Jesus said, \"I am the bread of life.\" Just as our bodies need food each day, how do you nourish your soul with the presence of Jesus in your daily life?",
      "Jesus promised, \"Him that cometh to me I will in no wise cast out.\" How does this promise bring you comfort and assurance today?",
    ],
  },
  // ==================== LESSON 9 ====================
  {
    id: "9",
    version: 1,
    title: "The Light of the World",
    subtitle: "Jesus Heals a Man Born Blind",
    date: "2026-05-31",
    scheduledDate: "2026-05-31",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 9:1-7, 35-38",
    },
    blocks: [
      {
        type: "context",
        content:
          "As Jesus was walking with His disciples, they came upon a man who had been blind from the day he was born. He had never seen the face of his mother, the light of the sun, or the beauty of God's creation. In those days, many people believed that sickness and disability were always the result of someone's sin.\n\nThe disciples asked Jesus, \"Master, who did sin, this man, or his parents, that he was born blind?\" It was a common question of the time. People assumed that suffering always had to be someone's fault. Jesus corrected that way of thinking. He said that this man's blindness was not caused by anyone's sin. Instead, it was an occasion for the works of God to be displayed. God had a purpose in this man's life, and Jesus was about to reveal it.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "And as Jesus passed by, he saw a man which was blind from his birth. And his disciples asked him, saying, Master, who did sin, this man, or his parents, that he was born blind? Jesus answered, Neither hath this man sinned, nor his parents: but that the works of God should be made manifest in him. I must work the works of him that sent me, while it is day: the night cometh, when no man can work. As long as I am in the world, I am the light of the world. When he had thus spoken, he spat on the ground, and made clay of the spittle, and he anointed the eyes of the blind man with the clay, And said unto him, Go, wash in the pool of Siloam, (which is by interpretation, Sent.) He went his way therefore, and washed, and came seeing.",
        reference: "John 9:1-7",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Jesus declared, \"As long as I am in the world, I am the light of the world.\" Then He did something unexpected. He spat on the ground, made clay, and put it on the man's eyes. He told the man to go wash in the pool of Siloam. The man obeyed, and when he washed, he could see for the very first time in his life.\n\nThink about that moment. The first thing this man ever saw was the world God had made. The man had to trust Jesus and do what He said, even though it did not make sense. Mud on the eyes does not seem like a cure for blindness. But when we obey the Lord in faith, He works in ways we could never predict. The man walked to the pool in darkness and came back seeing the light.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus said that the man's blindness was an occasion for the works of God to be displayed. How does this change the way you think about difficult circumstances in your own life?\n\nThe blind man obeyed Jesus even though the instructions seemed unusual. Can you think of a time when God asked you to do something that did not make sense at first, and you later saw His purpose in it?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "Jesus heard that they had cast him out; and when he had found him, he said unto him, Dost thou believe on the Son of God? He answered and said, Who is he, Lord, that I might believe on him? And Jesus said unto him, Thou hast both seen him, and it is he that talketh with thee. And he said, Lord, I believe. And he worshipped him.",
        reference: "John 9:35-38",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "After the man was healed, the religious leaders questioned him and eventually threw him out of the synagogue because he would not deny that Jesus had healed him. He stood firm in his testimony even when it cost him.\n\nThen Jesus came and found him. Once again, we see Jesus seeking out someone who has been cast aside. He asked the man, \"Dost thou believe on the Son of God?\" The man wanted to believe but asked who the Son of God was. Jesus said, \"Thou hast both seen him, and it is he that talketh with thee.\" The man's response was simple and beautiful: \"Lord, I believe.\" And he worshipped Jesus right then and there. The man who had been blind all his life could now see in two ways. His physical eyes were opened, and the eyes of his heart were opened to know Jesus as Lord.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "The healed man stood firm in his testimony even when the religious leaders pressured him. What gives you the courage to hold on to your faith when others question or challenge it?\n\nWhen Jesus revealed Himself, the man said, \"Lord, I believe,\" and worshipped Him. What does it mean to you to truly see Jesus and worship Him with a grateful heart?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, ask the Lord to open your eyes to see His goodness and His work in the world around you. Each evening, write down or think of one thing you noticed during the day that showed you God's presence. Like the man born blind, we can praise God for the gift of sight, both physical and spiritual.",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Jesus said that the man's blindness was an occasion for the works of God to be displayed. How does this change the way you think about difficult circumstances in your own life?",
      "The blind man obeyed Jesus even though the instructions seemed unusual. Can you think of a time when God asked you to do something that did not make sense at first, and you later saw His purpose in it?",
      "The healed man stood firm in his testimony even when the religious leaders pressured him. What gives you the courage to hold on to your faith when others question or challenge it?",
      "When Jesus revealed Himself, the man said, \"Lord, I believe,\" and worshipped Him. What does it mean to you to truly see Jesus and worship Him with a grateful heart?",
    ],
  },
  // ==================== LESSON 10 ====================
  {
    id: "10",
    version: 1,
    title: "The Good Shepherd",
    subtitle: "Jesus Describes His Love for His People",
    date: "2026-06-07",
    scheduledDate: "2026-06-07",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 10:1-15",
    },
    blocks: [
      {
        type: "context",
        content:
          "Shepherding was one of the oldest and most common occupations in Israel. The people who first heard Jesus speak these words understood exactly what He meant. A shepherd spent day and night with his flock. He led them to fresh pasture and clean water. He protected them from wolves, lions, and thieves.\n\nThe bond between a shepherd and his sheep was personal and deep. The shepherd knew each sheep by name, and the sheep knew the sound of their shepherd's voice. They would follow him and no one else. When Jesus called Himself the Good Shepherd, He was using an image that every person in His audience knew well. He was telling them that He would care for them with the same tenderness and devotion that a faithful shepherd shows to his flock.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "Verily, verily, I say unto you, He that entereth not by the door into the sheepfold, but climbeth up some other way, the same is a thief and a robber. But he that entereth in by the door is the shepherd of the sheep. To him the porter openeth; and the sheep hear his voice: and he calleth his own sheep by name, and leadeth them out. And when he putteth forth his own sheep, he goeth before them, and the sheep follow him: for they know his voice. And a stranger will they not follow, but will flee from him: for they know not the voice of strangers.",
        reference: "John 10:1-5",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Jesus described a sheepfold, which was a walled enclosure where sheep were kept safe at night. The shepherd entered through the door, and the gatekeeper recognized him. A thief would try to climb in some other way, but the sheep would not follow a stranger's voice.\n\nThe most tender detail in this passage is that the shepherd \"calleth his own sheep by name.\" He does not treat them as a nameless flock. He knows each one individually. And when He leads them out, He does not drive them from behind. He goes before them, leading the way. The sheep follow because they recognize His voice and they trust Him. In the same way, Jesus knows each one of us by name. He goes ahead of us into every situation we will face. We can follow Him with confidence because He has already walked the path before us.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus said the shepherd calls his own sheep by name. What does it mean to you that God knows you personally and calls you by name?\n\nThe sheep follow the shepherd because they know his voice. How do you recognize the voice of Jesus in your daily life? What helps you hear Him clearly?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "I am the good shepherd: the good shepherd giveth his life for the sheep. But he that is an hireling, and not the shepherd, whose own the sheep are not, seeth the wolf coming, and leaveth the sheep, and fleeth: and the wolf catcheth them, and scattereth the sheep. The hireling fleeth, because he is an hireling, and careth not for the sheep. I am the good shepherd, and know my sheep, and am known of mine. As the Father knoweth me, even so know I the Father: and I lay down my life for the sheep.",
        reference: "John 10:11-15",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Jesus drew a clear contrast between a hired worker and a true shepherd. A hired worker runs away when danger comes because the sheep do not belong to him. He is working for pay, and he will not risk his own safety. But the good shepherd stays. He faces the danger. He puts himself between the wolf and the flock.\n\nJesus said, \"I am the good shepherd: the good shepherd giveth his life for the sheep.\" He was speaking of what He would do on the cross. He willingly laid down His life so that we could be safe and forgiven. No one took His life from Him by force. He gave it freely out of love. And His love for each of us is as personal and deep as a shepherd's love for the sheep he has raised from birth. We are known, loved, and protected by the Good Shepherd.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus said the good shepherd lays down his life for the sheep. How does knowing that Jesus gave His life for you personally change the way you face each day?\n\nJesus compared a hired worker who runs away to a true shepherd who stays. Who in your life has been a faithful \"shepherd\" figure, someone who stayed and cared for you in a difficult time?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, read Psalm 23 alongside John 10 and notice how the two passages echo each other. Each morning, thank the Good Shepherd for knowing you by name and walking ahead of you into the day. If you feel worried or uncertain about something, picture Jesus as your shepherd going before you, and let His presence bring you peace.",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Jesus said the shepherd calls his own sheep by name. What does it mean to you that God knows you personally and calls you by name?",
      "The sheep follow the shepherd because they know his voice. How do you recognize the voice of Jesus in your daily life? What helps you hear Him clearly?",
      "Jesus said the good shepherd lays down his life for the sheep. How does knowing that Jesus gave His life for you personally change the way you face each day?",
      "Jesus compared a hired worker who runs away to a true shepherd who stays. Who in your life has been a faithful \"shepherd\" figure, someone who stayed and cared for you in a difficult time?",
    ],
  },
  // ==================== LESSON 11 ====================
  {
    id: "11",
    version: 1,
    title: "Lazarus, Come Forth",
    subtitle: "Jesus Raises His Friend from the Dead",
    date: "2026-06-14",
    scheduledDate: "2026-06-14",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 11:17-44",
    },
    blocks: [
      {
        type: "context",
        content:
          "Lazarus lived in the village of Bethany with his two sisters, Martha and Mary. They were close friends of Jesus, and He had visited their home many times. When Lazarus became very sick, Martha and Mary sent word to Jesus right away. But Jesus waited two more days before traveling to Bethany.\n\nBy the time He arrived, Lazarus had been in the tomb for four days. The people of Bethany were mourning with Martha and Mary. Many friends and neighbors had come to comfort the sisters in their grief.\n\nWhen Martha heard that Jesus was coming, she went out to meet Him on the road. Mary stayed behind at the house. What happened next would become one of the greatest miracles recorded in Scripture.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "Then when Jesus came, he found that he had lain in the grave four days already. Now Bethany was nigh unto Jerusalem, about fifteen furlongs off: And many of the Jews came to Martha and Mary, to comfort them concerning their brother. Then Martha, as soon as she heard that Jesus was coming, went and met him: but Mary sat still in the house. Then said Martha unto Jesus, Lord, if thou hadst been here, my brother had not died. But I know, that even now, whatsoever thou wilt ask of God, God will give it thee. Jesus said unto her, Thy brother shall rise again. Martha saith unto him, I know that he shall rise again in the resurrection at the last day. Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live: And whosoever liveth and believeth in me shall never die. Believest thou this? She saith unto him, Yea, Lord: I believe that thou art the Christ, the Son of God, which should come into the world.",
        reference: "John 11:17-27",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Martha was honest with Jesus. She told Him that if He had been there, her brother would not have died. Even in her grief, she trusted that God would give Jesus whatever He asked. Her faith was strong even when her heart was breaking.\n\nJesus spoke one of the most powerful statements in all of Scripture: \"I am the resurrection, and the life.\" He wanted Martha to know that He has power over death itself. Those who believe in Him will live, even after they die.\n\nMartha answered with beautiful faith. She said, \"Yea, Lord: I believe that thou art the Christ, the Son of God.\" In the middle of her sorrow, she declared her trust in Jesus. Sometimes our greatest moments of faith come during our hardest days.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Martha told Jesus honestly how she felt, yet she still trusted Him. How do you balance being honest with God about your pain while still holding on to faith?\n\nJesus said, \"I am the resurrection, and the life.\" What does this promise mean to you personally, especially when you think about loved ones who have passed away?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "Jesus therefore again groaning in himself cometh to the grave. It was a cave, and a stone lay upon it. Jesus said, Take ye away the stone. Martha, the sister of him that was dead, saith unto him, Lord, by this time he stinketh: for he hath been dead four days. Jesus saith unto her, Said I not unto thee, that, if thou wouldest believe, thou shouldest see the glory of God? Then they took away the stone from the place where the dead was laid. And Jesus lifted up his eyes, and said, Father, I thank thee that thou hast heard me. And I knew that thou hearest me always: but because of the people which stand by I said it, that they may believe that thou hast sent me. And when he thus had spoken, he cried with a loud voice, Lazarus, come forth. And he that was dead came forth, bound hand and foot with graveclothes: and his face was bound about with a napkin. Jesus saith unto them, Loose him, and let him go.",
        reference: "John 11:38-44",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Jesus stood before the tomb and asked them to remove the stone. Martha hesitated, reminding Him that Lazarus had been dead for four days. But Jesus gently pointed her back to faith. He said, \"If thou wouldest believe, thou shouldest see the glory of God.\"\n\nThen Jesus prayed to His Father and called out with a loud voice, \"Lazarus, come forth.\" And the man who had been dead for four days walked out of that tomb, still wrapped in graveclothes. The people standing there saw the power of God with their own eyes.\n\nThis miracle shows us that nothing is too hard for Jesus. He has power over sickness, death, and the grave. Whatever situation feels hopeless in our lives, Jesus can bring new life and new hope.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus told Martha, \"If thou wouldest believe, thou shouldest see the glory of God.\" Has there been a time in your life when you had to trust God before you could see what He was doing?\n\nLazarus came out of the tomb still bound in graveclothes, and Jesus told the people to loose him. In what ways has Jesus set you free from things that once held you back?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, if you are carrying a heavy burden or facing something that feels impossible, bring it to Jesus in prayer. Remember that He wept with Martha and Mary before He raised Lazarus. He cares about your pain, and He has the power to bring hope into every situation. Trust Him with what troubles your heart today.",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Martha told Jesus honestly how she felt, yet she still trusted Him. How do you balance being honest with God about your pain while still holding on to faith?",
      "Jesus said, \"I am the resurrection, and the life.\" What does this promise mean to you personally, especially when you think about loved ones who have passed away?",
      "Jesus told Martha, \"If thou wouldest believe, thou shouldest see the glory of God.\" Has there been a time in your life when you had to trust God before you could see what He was doing?",
      "Lazarus came out of the tomb still bound in graveclothes, and Jesus told the people to loose him. In what ways has Jesus set you free from things that once held you back?",
    ],
  },
  // ==================== LESSON 12 ====================
  {
    id: "12",
    version: 1,
    title: "An Act of Love",
    subtitle: "Mary Anoints Jesus at Bethany",
    date: "2026-06-21",
    scheduledDate: "2026-06-21",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 12:1-8",
    },
    blocks: [
      {
        type: "context",
        content:
          "Six days before the Passover, Jesus returned to Bethany to visit Lazarus, Martha, and Mary. This was the same Lazarus whom Jesus had recently raised from the dead. The family prepared a dinner in His honor. Martha served the meal, and Lazarus sat at the table with Jesus.\n\nThe house must have been filled with joy that evening. Lazarus was alive and well. Friends had gathered to celebrate. During the meal, Mary did something unexpected and deeply moving. She brought out a gift that was worth nearly a year's wages, and she poured it all out for Jesus.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "Then Jesus six days before the passover came to Bethany, where Lazarus was which had been dead, whom he raised from the dead. There they made him a supper; and Martha served: but Lazarus was one of them that sat at the table with him. Then took Mary a pound of ointment of spikenard, very costly, and anointed the feet of Jesus, and wiped his feet with her hair: and the house was filled with the odour of the ointment.",
        reference: "John 12:1-3",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Mary took a pound of spikenard, a precious perfume, and poured it on the feet of Jesus. Then she wiped His feet with her hair. This was an act of deep love and humble worship. In that culture, letting down your hair in public was unusual for a woman.\n\nMary did not care what others thought. She wanted to honor Jesus with the very best she had. The fragrance of the ointment filled the entire house. Everyone in the room could see and smell the gift she had given.\n\nMary held nothing back. She gave generously and without hesitation. Sometimes the most meaningful gifts are the ones that cost us something.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Mary gave something very precious to Jesus without hesitation. What is the most meaningful gift you have ever given or received, and what made it special?\n\nThe fragrance of Mary's gift filled the whole house. When we give to the Lord with a willing heart, how do you think it affects the people around us?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "Then saith one of his disciples, Judas Iscariot, Simon's son, which should betray him, Why was not this ointment sold for three hundred pence, and given to the poor? This he said, not that he cared for the poor; but because he was a thief, and had the bag, and bare what was put therein. Then said Jesus, Let her alone: against the day of my burying hath she kept this. For the poor always ye have with you; but me ye have not always.",
        reference: "John 12:4-8",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Judas complained about what Mary had done. He said the perfume should have been sold and the money given to the poor. Scripture tells us that Judas did not truly care about the poor. He was a thief who took money from the group's treasury.\n\nJesus spoke up and defended Mary. He said, \"Let her alone.\" He honored her gift and her heart. Jesus knew that He was about to go to the cross, and Mary's anointing was preparing Him for burial.\n\nJesus always sees the heart behind our giving. When we offer Him our time, our love, or our resources, He receives it with kindness. No gift given to Jesus in love is ever wasted.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Judas criticized Mary's gift, but Jesus defended her. Have you ever felt discouraged when someone questioned your acts of faith or generosity? How did you respond?\n\nJesus said that no gift of love is wasted. What is one way you can offer your time, your talent, or your heart to Jesus this season of your life?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, think about one thing you can offer to Jesus as an act of love. It might be time spent in prayer, a kind word to someone who is lonely, or a small act of service. Like Mary, give it freely and without worrying about what others might think. Jesus sees every gift of love, and He treasures it.",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Mary gave something very precious to Jesus without hesitation. What is the most meaningful gift you have ever given or received, and what made it special?",
      "The fragrance of Mary's gift filled the whole house. When we give to the Lord with a willing heart, how do you think it affects the people around us?",
      "Judas criticized Mary's gift, but Jesus defended her. Have you ever felt discouraged when someone questioned your acts of faith or generosity? How did you respond?",
      "Jesus said that no gift of love is wasted. What is one way you can offer your time, your talent, or your heart to Jesus this season of your life?",
    ],
  },
  // ==================== LESSON 13 ====================
  {
    id: "13",
    version: 1,
    title: "The Servant King",
    subtitle: "Jesus Washes His Disciples' Feet",
    date: "2026-06-28",
    scheduledDate: "2026-06-28",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 13:1-17",
    },
    blocks: [
      {
        type: "context",
        content:
          "It was the night before Jesus would go to the cross. He gathered with His twelve disciples for a final meal together. In those days, people wore sandals and walked on dusty roads. When guests arrived at a home, a servant would wash their feet. It was considered one of the lowest tasks a person could do.\n\nThat evening, no servant was present to do the washing. The disciples sat down to eat, and none of them offered to take up the towel and basin. Then Jesus, the Son of God, did something that stunned everyone in the room. He stood up from supper, laid aside His outer garment, and began to do the work of a servant.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "Now before the feast of the passover, when Jesus knew that his hour was come that he should depart out of this world unto the Father, having loved his own which were in the world, he loved them unto the end. And supper being ended, the devil having now put into the heart of Judas Iscariot, Simon's son, to betray him; Jesus knowing that the Father had given all things into his hands, and that he was come from God, and went to God; He riseth from supper, and laid aside his garments; and took a towel, and girded himself. After that he poureth water into a bason, and began to wash the disciples' feet, and to wipe them with the towel wherewith he was girded.",
        reference: "John 13:1-5",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Think about what Jesus knew in that moment. He knew that God had given all things into His hands. He knew He had come from God and was going back to God. He had all the power and authority in the universe. And yet He knelt down and washed dirty feet.\n\nJesus did this knowing that one of the men at that table would betray Him. He washed the feet of Judas, too. His love was not limited to those who loved Him back. He served everyone in that room with the same care.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus knelt down and served His disciples even though He held all power and authority. What does His example teach you about true greatness?\n\nJesus washed the feet of everyone at the table, including Judas who would betray Him. How does this challenge you in the way you treat people who may have hurt you or let you down?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "So after he had washed their feet, and had taken his garments, and was set down again, he said unto them, Know ye what I have done to you? Ye call me Master and Lord: and ye say well; for so I am. If I then, your Lord and Master, have washed your feet; ye also ought to wash one another's feet. For I have given you an example, that ye should do as I have done to you. Verily, verily, I say unto you, The servant is not greater than his lord; neither he that is sent greater than he that sent him. If ye know these things, happy are ye if ye do them.",
        reference: "John 13:12-17",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "After Jesus finished, He sat back down and asked the disciples a question: \"Know ye what I have done to you?\" He wanted them to understand the meaning behind His actions. He was giving them an example to follow.\n\nJesus said, \"If I then, your Lord and Master, have washed your feet; ye also ought to wash one another's feet.\" If the Lord Himself was willing to serve, then we should be willing to serve one another. No act of kindness is too small.\n\nThen Jesus added a wonderful promise. He said, \"If ye know these things, happy are ye if ye do them.\" There is a deep and lasting joy that comes from serving others. When we follow the example of Jesus and care for the people around us, we find the happiness that He promised.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus said, \"Happy are ye if ye do them.\" When have you experienced joy from serving someone else in a simple, practical way?\n\nJesus gave His disciples an example to follow. Who in your life has shown you what humble service looks like, and how has their example influenced you?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, look for one simple way to serve someone around you. It might be offering an encouraging word, helping with a small task, or spending time with someone who is lonely. Follow the example of Jesus, who showed us that the greatest among us is the one who serves.",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Jesus knelt down and served His disciples even though He held all power and authority. What does His example teach you about true greatness?",
      "Jesus washed the feet of everyone at the table, including Judas who would betray Him. How does this challenge you in the way you treat people who may have hurt you or let you down?",
      "Jesus said, \"Happy are ye if ye do them.\" When have you experienced joy from serving someone else in a simple, practical way?",
      "Jesus gave His disciples an example to follow. Who in your life has shown you what humble service looks like, and how has their example influenced you?",
    ],
  },
  // ==================== LESSON 14 ====================
  {
    id: "14",
    version: 1,
    title: "Love One Another",
    subtitle: "The New Commandment Jesus Gave",
    date: "2026-07-05",
    scheduledDate: "2026-07-05",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 13:31-35",
      additional: ["John 15:12-17"],
    },
    blocks: [
      {
        type: "context",
        content:
          "After washing the disciples' feet and sharing the Last Supper, Jesus knew His time on earth was almost over. He had important things to tell His closest followers before He went to the cross. Of all the lessons He could have taught in those final hours, He chose to talk about love.\n\nThe disciples had been with Jesus for about three years. They had seen Him heal the sick, feed the hungry, and forgive sinners. Now He was about to give them a new commandment that would set His followers apart from everyone else.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "Therefore, when he was gone out, Jesus said, Now is the Son of man glorified, and God is glorified in him. If God be glorified in him, God shall also glorify him in himself, and shall straightway glorify him. Little children, yet a little while I am with you. Ye shall seek me: and as I said unto the Jews, Whither I go, ye cannot come; so now I say to you. A new commandment I give unto you, That ye love one another; as I have loved you, that ye also love one another. By this shall all men know that ye are my disciples, if ye have love one to another.",
        reference: "John 13:31-35",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Jesus called His disciples \"little children.\" This tender name shows how much He cared for them. He spoke to them the way a loving parent speaks to a family before a long journey.\n\nHe gave them a new commandment: \"That ye love one another; as I have loved you.\" The word \"as\" is the key. They were to love in the same way Jesus loved. His love was patient, generous, forgiving, and selfless.\n\nThen Jesus said something remarkable. He said that the world would recognize His followers by their love.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus said the world would know His followers by their love. What does love look like in everyday life among believers, in your experience?\n\nJesus called His disciples \"little children\" and spoke tenderly to them before He left. How does knowing that Jesus speaks to you with that kind of affection change the way you come to Him in prayer?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "This is my commandment, That ye love one another, as I have loved you. Greater love hath no man than this, that a man lay down his life for his friends. Ye are my friends, if ye do whatsoever I command you. Henceforth I call you not servants; for the servant knoweth not what his lord doeth: but I have called you friends; for all things that I have heard of my Father I have made known unto you. Ye have not chosen me, but I have chosen you, and ordained you, that ye should go and bring forth fruit, and that your fruit should remain: that whatsoever ye shall ask of the Father in my name, he may give it you.",
        reference: "John 15:12-17",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Later that same evening, Jesus returned to this theme of love. He said, \"Greater love hath no man than this, that a man lay down his life for his friends.\" The very next day, Jesus would do exactly that. He would lay down His own life on the cross for the people He loved.\n\nJesus also called His disciples friends. He said, \"Henceforth I call you not servants... but I have called you friends.\" What a wonderful thing to be called a friend of Jesus.\n\nHe told them that He had chosen them and appointed them to go and bear fruit. The fruit of a life lived with Jesus is love. When we love one another, we show the world that we belong to Him.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus said, \"I have called you friends.\" What does it mean to you to be called a friend of Jesus? How does that change the way you think about your relationship with Him?\n\nJesus said He chose us to \"bring forth fruit.\" What kind of fruit do you think He wants to see growing in your life right now?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, choose one person and show them the love of Christ in a practical way. Write a note of encouragement, make a phone call, say a kind word, or simply listen to someone who needs a friend. Remember that Jesus said the greatest love is the kind that gives of itself for others.",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Jesus said the world would know His followers by their love. What does love look like in everyday life among believers, in your experience?",
      "Jesus called His disciples \"little children\" and spoke tenderly to them before He left. How does knowing that Jesus speaks to you with that kind of affection change the way you come to Him in prayer?",
      "Jesus said, \"I have called you friends.\" What does it mean to you to be called a friend of Jesus? How does that change the way you think about your relationship with Him?",
      "Jesus said He chose us to \"bring forth fruit.\" What kind of fruit do you think He wants to see growing in your life right now?",
    ],
  },
  // ==================== LESSON 15 ====================
  {
    id: "15",
    version: 1,
    title: "A Place Prepared",
    subtitle: "Jesus Promises to Come Again",
    date: "2026-07-12",
    scheduledDate: "2026-07-12",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 14:1-14",
    },
    blocks: [
      {
        type: "context",
        content:
          "The disciples were troubled. Jesus had just told them that He was going away and that they could not follow Him yet. They did not understand what was happening. Peter had asked where He was going. Thomas said they did not even know the way.\n\nJesus could see the worry on their faces, and He spoke these words to comfort them. These are some of the most beloved verses in all of Scripture. Countless believers through the centuries have found peace in these words during times of uncertainty and grief.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "Let not your heart be troubled: ye believe in God, believe also in me. In my Father's house are many mansions: if it were not so, I would have told you. I go to prepare a place for you. And if I go and prepare a place for you, I will come again, and receive you unto myself; that where I am, there ye may be also. And whither I go ye know, and the way ye know. Thomas saith unto him, Lord, we know not whither thou goest; and how can we know the way? Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
        reference: "John 14:1-6",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "\"Let not your heart be troubled.\" These are words of comfort from a loving Savior. Jesus knew the disciples were afraid, and He wanted them to trust Him. He pointed them to faith in God and faith in Himself.\n\nThen He gave them a beautiful promise: \"In my Father's house are many mansions.\" Heaven is real, and there is room for everyone who trusts in Jesus. He said He was going ahead to prepare a place, and He promised to come back and take His followers to be with Him forever.\n\nWhen Thomas asked how they could know the way, Jesus answered: \"I am the way, the truth, and the life.\" Jesus Himself is the path to God. We do not have to wonder or worry about finding our way.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus said, \"Let not your heart be troubled.\" What worries or fears do you bring to Him when your heart feels heavy?\n\nJesus promised, \"I go to prepare a place for you.\" How does the promise of heaven bring you comfort and hope in your daily life?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "If ye had known me, ye should have known my Father also: and from henceforth ye know him, and have seen him. Philip saith unto him, Lord, shew us the Father, and it sufficeth us. Jesus saith unto him, Have I been so long time with you, and yet hast thou not known me, Philip? he that hath seen me hath seen the Father; and how sayest thou then, Shew us the Father? Believest thou not that I am in the Father, and the Father in me? the words that I speak unto you I speak not of myself: but the Father that dwelleth in me, he doeth the works. Believe me that I am in the Father, and the Father in me: or else believe me for the very works' sake. Verily, verily, I say unto you, He that believeth on me, the works that I do shall he do also; and greater works than these shall he do; because I go unto my Father. And whatsoever ye shall ask in my name, that will I do, that the Father may be glorified in the Son. If ye shall ask any thing in my name, I will do it.",
        reference: "John 14:7-14",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Philip asked Jesus to show them the Father. Jesus answered gently, \"He that hath seen me hath seen the Father.\" Every time the disciples watched Jesus heal the sick, comfort the broken, and forgive sinners, they were seeing the heart of God the Father. Jesus is the perfect picture of who God is.\n\nJesus also gave a wonderful promise about prayer. He said, \"Whatsoever ye shall ask in my name, that will I do.\" He invites us to come to God in prayer through His name. We can bring our needs, our worries, and our hopes to Him, knowing that He hears us and cares for us.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus told Philip, \"He that hath seen me hath seen the Father.\" When you look at the life of Jesus, what does it teach you about the heart and character of God?\n\nJesus promised to answer prayer offered in His name. How has prayer been a source of strength and connection with God in your own life?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, when you feel worried or unsure about the future, remember the words of Jesus: \"Let not your heart be troubled.\" He has prepared a place for you, and He has promised to come again. Spend a few minutes each day thanking Him for that promise.",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Jesus said, \"Let not your heart be troubled.\" What worries or fears do you bring to Him when your heart feels heavy?",
      "Jesus promised, \"I go to prepare a place for you.\" How does the promise of heaven bring you comfort and hope in your daily life?",
      "Jesus told Philip, \"He that hath seen me hath seen the Father.\" When you look at the life of Jesus, what does it teach you about the heart and character of God?",
      "Jesus promised to answer prayer offered in His name. How has prayer been a source of strength and connection with God in your own life?",
    ],
  },
  // ==================== LESSON 16 ====================
  {
    id: "16",
    version: 1,
    title: "The True Vine",
    subtitle: "Staying Connected to Jesus",
    date: "2026-07-19",
    scheduledDate: "2026-07-19",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 15:1-11",
    },
    blocks: [
      {
        type: "context",
        content:
          "Vineyards were everywhere in Israel. Grapes were one of the most important crops. Everyone understood how a vineyard worked. The vine gave life to the branches, and the branches produced the fruit. A branch that was cut off from the vine would dry up and die.\n\nJesus used this picture that everyone knew to teach an important truth about our relationship with Him.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "I am the true vine, and my Father is the husbandman. Every branch in me that beareth not fruit he taketh away: and every branch that beareth fruit, he purgeth it, that it may bring forth more fruit. Now ye are clean through the word which I have spoken unto you. Abide in me, and I in you. As the branch cannot bear fruit of itself, except it abide in the vine; no more can ye, except ye abide in me. I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit: for without me ye can do nothing.",
        reference: "John 15:1-5",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Jesus calls Himself the true vine and His Father the husbandman, which means the gardener. God the Father is the one who watches over the vineyard and cares for every branch.\n\nThe key word in this passage is \"abide.\" Jesus repeats it again and again. To abide means to remain, to stay close, to make your home in something. A branch does not have to strain or struggle to produce fruit. It simply stays connected to the vine, and the life of the vine flows through it naturally.\n\nJesus says that apart from Him, we can do nothing. Every good thing in our lives comes from staying close to Him.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus used the picture of a vine and branches to describe our connection with Him. What does \"abiding\" in Jesus look like in your everyday life?\n\nJesus says that apart from Him, we can do nothing. How have you experienced this truth in your own walk of faith?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "If ye abide in me, and my words abide in you, ye shall ask what ye will, and it shall be done unto you. Herein is my Father glorified, that ye bear much fruit; so shall ye be my disciples. As the Father hath loved me, so have I loved you: continue ye in my love. If ye keep my commandments, ye shall abide in my love; even as I have kept my Father's commandments, and abide in his love. These things have I spoken unto you, that my joy might remain in you, and that your joy might be full.",
        reference: "John 15:7-11",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Jesus connects abiding with love and with joy. He says, \"Continue ye in my love.\" He wants us to live each day wrapped in the knowledge that He loves us with the same love the Father has for Him.\n\nThen He gives us a beautiful promise: \"These things have I spoken unto you, that my joy might remain in you, and that your joy might be full.\" Jesus wants us to have full joy.\n\nWhen we stay close to Jesus through prayer, through His Word, and through time spent with other believers, His life flows through us. We bear fruit that blesses the people around us, and we experience a deep joy that the world cannot take away.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus says He wants our joy to be full. What brings you the deepest joy in your relationship with God?\n\nJesus says, \"Continue ye in my love.\" What are the things that help you stay close to Jesus and feel His love day by day?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, choose one simple way to abide in Jesus each day. You might spend a few quiet minutes in prayer each morning, read a favorite psalm before bed, or simply talk to Him throughout the day as you would a dear friend.",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Jesus used the picture of a vine and branches to describe our connection with Him. What does \"abiding\" in Jesus look like in your everyday life?",
      "Jesus says that apart from Him, we can do nothing. How have you experienced this truth in your own walk of faith?",
      "Jesus says He wants our joy to be full. What brings you the deepest joy in your relationship with God?",
      "Jesus says, \"Continue ye in my love.\" What are the things that help you stay close to Jesus and feel His love day by day?",
    ],
  },
  // ==================== LESSON 17 ====================
  {
    id: "17",
    version: 1,
    title: "The Helper",
    subtitle: "Jesus Promises the Holy Spirit",
    date: "2026-07-26",
    scheduledDate: "2026-07-26",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 14:15-21",
      additional: ["John 16:7-13"],
    },
    blocks: [
      {
        type: "context",
        content:
          "Jesus knew His disciples were afraid of being left alone. They had spent three years at His side every day. Now He was telling them He was going away. But Jesus did not want them to be afraid. He promised to send someone who would be with them forever. He called this person the Comforter, or the Helper. This is the Holy Spirit.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "If ye love me, keep my commandments. And I will pray the Father, and he shall give you another Comforter, that he may abide with you for ever; Even the Spirit of truth; whom the world cannot receive, because it seeth him not, neither knoweth him: but ye know him; for he dwelleth with you, and shall be in you. I will not leave you comfortless: I will come to you. Yet a little while, and the world seeth me no more; but ye see me: because I live, ye shall live also. At that day ye shall know that I am in my Father, and ye in me, and I in you. He that hath my commandments, and keepeth them, he it is that loveth me: and he that loveth me shall be loved of my Father, and I will love him, and will manifest myself to him.",
        reference: "John 14:15-21",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "What a tender promise Jesus gives here: \"I will not leave you comfortless.\" The word \"comfortless\" in the original language means \"orphans.\" Jesus was saying, \"I will not leave you as orphans.\" He would send the Holy Spirit to be with them and within them.\n\nJesus calls the Holy Spirit \"another Comforter.\" The word \"another\" means one of the same kind. The Holy Spirit would do for the disciples everything Jesus had been doing. He would teach them, guide them, strengthen them, and remind them of the truth.\n\nJesus also promised that the Spirit would abide with them forever.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus promised, \"I will not leave you comfortless.\" When have you felt the comfort and presence of the Holy Spirit in your life, especially during a difficult time?\n\nJesus said the Holy Spirit would abide with believers forever. How does knowing that God's Spirit lives within you give you courage and peace each day?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "Nevertheless I tell you the truth; It is expedient for you that I go away: for if I go not away, the Comforter will not come unto you; but if I depart, I will send him unto you. And when he is come, he will reprove the world of sin, and of righteousness, and of judgment: Of sin, because they believe not on me; Of righteousness, because I go to my Father, and ye see me no more; Of judgment, because the prince of this world is judged. I have yet many things to say unto you, but ye cannot bear them now. Howbeit when he, the Spirit of truth, is come, he will guide you into all truth: for he shall not speak of himself; but whatsoever he shall hear, that shall he speak: and he will shew you things to come.",
        reference: "John 16:7-13",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Jesus told His disciples something surprising. He said it was actually better for them that He go away, because then the Comforter would come. While Jesus walked the earth, He could only be in one place at a time. But the Holy Spirit would be present with every believer everywhere, all at once.\n\nJesus called the Holy Spirit \"the Spirit of truth\" and said He would guide believers into all truth. The Spirit helps us understand the Bible. He brings Scripture to our minds when we need it most. He gently teaches us and leads us in the right direction.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus said the Holy Spirit would \"guide you into all truth.\" Can you think of a time when the Spirit helped you understand something in Scripture or led you to make a wise decision?\n\nJesus said it was better for Him to go away so the Comforter could come. How does the Holy Spirit's presence in your daily life compare to what it would have been like to walk with Jesus in person?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, when you face a worry or a hard moment, pause and remember that the Holy Spirit is right there with you. You might pray a simple prayer like, \"Holy Spirit, thank You for being with me. Please guide me and give me Your peace.\"",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Jesus promised, \"I will not leave you comfortless.\" When have you felt the comfort and presence of the Holy Spirit in your life, especially during a difficult time?",
      "Jesus said the Holy Spirit would abide with believers forever. How does knowing that God's Spirit lives within you give you courage and peace each day?",
      "Jesus said the Holy Spirit would \"guide you into all truth.\" Can you think of a time when the Spirit helped you understand something in Scripture or led you to make a wise decision?",
      "Jesus said it was better for Him to go away so the Comforter could come. How does the Holy Spirit's presence in your daily life compare to what it would have been like to walk with Jesus in person?",
    ],
  },
  // ==================== LESSON 18 ====================
  {
    id: "18",
    version: 1,
    title: "Jesus Prays for Us",
    subtitle: "The Prayer Jesus Prayed for All Believers",
    date: "2026-08-02",
    scheduledDate: "2026-08-02",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 17:1-5, 20-26",
    },
    blocks: [
      {
        type: "context",
        content:
          "John chapter 17 contains the longest recorded prayer of Jesus. He prayed this prayer out loud so His disciples could hear every word. It was the night before He went to the cross.\n\nFirst He prayed for Himself, then for His disciples, and then for all believers who would come after them. That includes every person who has trusted in Jesus throughout all of history, including us today. On the most difficult night of His life, Jesus took time to pray for you and for me.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "These words spake Jesus, and lifted up his eyes to heaven, and said, Father, the hour is come; glorify thy Son, that thy Son also may glorify thee: As thou hast given him power over all flesh, that he should give eternal life to as many as thou hast given him. And this is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent. I have glorified thee on the earth: I have finished the work which thou gavest me to do. And now, O Father, glorify thou me with thine own self with the glory which I had with thee before the world was.",
        reference: "John 17:1-5",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Jesus begins His prayer by speaking to His Father about the hour that has come. He knew the cross was just hours away. Yet He did not pray to escape it. He prayed that the Father would be glorified through it.\n\nIn verse 3, Jesus gives us a beautiful definition of eternal life. He says eternal life is knowing the only true God and Jesus Christ whom He sent. Eternal life is a relationship. It is knowing God personally, walking with Him day by day.\n\nJesus also says, \"I have finished the work which thou gavest me to do.\" He had been faithful to complete every assignment the Father gave Him.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus defined eternal life as knowing God and knowing Jesus Christ. How does thinking of eternal life as a relationship change the way you understand it?\n\nJesus said, \"I have finished the work which thou gavest me to do.\" What does faithfulness to God's calling look like in your own life and season?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "Neither pray I for these alone, but for them also which shall believe on me through their word; That they all may be one; as thou, Father, art in me, and I in thee, that they also may be one in us: that the world may believe that thou hast sent me. And the glory which thou gavest me I have given them; that they may be one, even as we are one: I in them, and thou in me, that they may be made perfect in one; and that the world may know that thou hast sent me, and hast loved them, as thou hast loved me. Father, I will that they also, whom thou hast given me, be with me where I am; that they may behold my glory, which thou hast given me: for thou lovedst me before the foundation of the world. O righteous Father, the world hath not known thee: but I have known thee, and these have known that thou hast sent me. And I have declared unto them thy name, and will declare it: that the love wherewith thou hast loved me may be in them, and I in them.",
        reference: "John 17:20-26",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "In verse 20, Jesus turns His prayer toward every future believer. He says, \"Neither pray I for these alone, but for them also which shall believe on me through their word.\" That means Jesus prayed specifically for you. He had you in mind as He poured out His heart to the Father.\n\nHe prayed that all believers would be united in love, just as He and the Father are one. He prayed that the love of God would be in us. And He prayed for something that should fill our hearts with hope: He asked that we would be with Him forever, beholding His glory.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus prayed for future believers, which includes you and me. How does it make you feel to know that Jesus prayed for you by name on the night before the cross?\n\nJesus asked that believers would be united in love. Why do you think unity among believers is so important to Jesus, and how can we grow in that unity?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, take a quiet moment to read John 17 slowly and prayerfully. As you read the words Jesus spoke to His Father, remember that He was praying for you. Let that truth fill you with gratitude and peace, and let it move you to pray for others with the same love.",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Jesus defined eternal life as knowing God and knowing Jesus Christ. How does thinking of eternal life as a relationship change the way you understand it?",
      "Jesus said, \"I have finished the work which thou gavest me to do.\" What does faithfulness to God's calling look like in your own life and season?",
      "Jesus prayed for future believers, which includes you and me. How does it make you feel to know that Jesus prayed for you by name on the night before the cross?",
      "Jesus asked that believers would be united in love. Why do you think unity among believers is so important to Jesus, and how can we grow in that unity?",
    ],
  },
  // ==================== LESSON 19 ====================
  {
    id: "19",
    version: 1,
    title: "It Is Finished",
    subtitle: "Jesus Goes to the Cross",
    date: "2026-08-09",
    scheduledDate: "2026-08-09",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 19:16-30",
    },
    blocks: [
      {
        type: "context",
        content:
          "After being arrested, tried, beaten, and mocked, Jesus was handed over to be crucified. He carried His own cross to a place outside Jerusalem called Golgotha, which means \"the place of a skull.\" Two others were crucified alongside Him, one on each side.\n\nPilate had a sign placed above the cross that read, \"Jesus of Nazareth, the King of the Jews.\" Even in these dark hours, God was in control. Everything that happened at the cross fulfilled prophecies written hundreds of years before.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "Then delivered he him therefore unto them to be crucified. And they took Jesus, and led him away. And he bearing his cross went forth into a place called the place of a skull, which is called in the Hebrew Golgotha: Where they crucified him, and two other with him, on either side one, and Jesus in the midst. And Pilate wrote a title, and put it on the cross. And the writing was, JESUS OF NAZARETH THE KING OF THE JEWS. This title then read many of the Jews: for the place where Jesus was crucified was nigh to the city: and it was written in Hebrew, and Greek, and Latin. Then said the chief priests of the Jews to Pilate, Write not, The King of the Jews; but that he said, I am King of the Jews. Pilate answered, What I have written I have written.",
        reference: "John 19:16-22",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "The sign above the cross was written in three languages so that everyone could read it: Hebrew for the Jewish people, Greek for the scholars, and Latin for the Romans. The whole world could see the announcement: Jesus of Nazareth, the King of the Jews.\n\nThe religious leaders wanted Pilate to change the wording, but he refused. Without knowing it, Pilate declared the truth. Jesus truly is the King.\n\nAs Jesus hung on the cross, He thought of others. He made sure His mother would be cared for by the disciple John. Even in His suffering, His love for others never stopped.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Pilate wrote, \"Jesus of Nazareth, the King of the Jews,\" and refused to change it. In what ways do you recognize Jesus as your King in your everyday life?\n\nEven while suffering on the cross, Jesus made sure His mother would be cared for. What does this tell you about the heart of Jesus and His love for those He holds dear?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "After this, Jesus knowing that all things were now accomplished, that the scripture might be fulfilled, saith, I thirst. Now there was set a vessel full of vinegar: and they filled a spunge with vinegar, and put it upon hyssop, and put it to his mouth. When Jesus therefore had received the vinegar, he said, It is finished: and he bowed his head, and gave up the ghost.",
        reference: "John 19:28-30",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Three of the most powerful words ever spoken ring out from the cross: \"It is finished.\" In the original Greek, this is one word: tetelestai. It means \"paid in full.\" It was a word used when a debt had been completely settled. Nothing more was owed.\n\nJesus was declaring that the work of salvation was complete. The price for sin had been paid. The separation between God and humanity had been bridged. Every prophecy had been fulfilled.\n\nNotice that Jesus did not say, \"I am finished,\" as though He had been defeated. He said, \"It is finished,\" as a victor announcing that the work is done. Then He bowed His head and willingly gave up His spirit. No one took His life from Him. He laid it down of His own choice, out of love for you and for me.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus said, \"It is finished,\" declaring that the work of salvation is complete. How does knowing that the price has been \"paid in full\" affect the way you come to God in prayer?\n\nJesus laid down His life willingly. No one took it from Him. What does this willing sacrifice mean to you personally?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, spend a few minutes each day thanking Jesus for what He accomplished on the cross. You might say, \"Lord, thank You that the price is paid in full. Thank You that there is nothing I need to add to what You have done. Help me rest in Your finished work.\"",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "Pilate wrote, \"Jesus of Nazareth, the King of the Jews,\" and refused to change it. In what ways do you recognize Jesus as your King in your everyday life?",
      "Even while suffering on the cross, Jesus made sure His mother would be cared for. What does this tell you about the heart of Jesus and His love for those He holds dear?",
      "Jesus said, \"It is finished,\" declaring that the work of salvation is complete. How does knowing that the price has been \"paid in full\" affect the way you come to God in prayer?",
      "Jesus laid down His life willingly. No one took it from Him. What does this willing sacrifice mean to you personally?",
    ],
  },
  // ==================== LESSON 20 ====================
  {
    id: "20",
    version: 1,
    title: "He Is Risen",
    subtitle: "The Resurrection of Jesus",
    date: "2026-08-16",
    scheduledDate: "2026-08-16",
    isPublished: true,
    author: "Ministry Team",
    scripture: {
      primary: "John 20:1-18",
      additional: ["John 20:24-29"],
    },
    blocks: [
      {
        type: "context",
        content:
          "It was early Sunday morning, the first day of the week. The sun had not yet risen. Mary Magdalene made her way to the tomb where the body of Jesus had been laid after the crucifixion. She expected to find the tomb sealed with a heavy stone.\n\nWhat she found instead changed everything. The stone had been rolled away. The tomb was open. Mary ran to tell Peter and John, and they came running to see for themselves.\n\nThe resurrection of Jesus is the most important event in all of history. Because He rose from the dead, we have the sure and certain hope that we too will live forever with Him.",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "The first day of the week cometh Mary Magdalene early, when it was yet dark, unto the sepulchre, and seeth the stone taken away from the sepulchre. Then she runneth, and cometh to Simon Peter, and to the other disciple, whom Jesus loved, and saith unto them, They have taken away the Lord out of the sepulchre, and we know not where they have laid him. Peter therefore went forth, and that other disciple, and came to the sepulchre. So they ran both together: and the other disciple did outrun Peter, and came first to the sepulchre. And he stooping down, and looking in, saw the linen clothes lying; yet went he not in. Then cometh Simon Peter following him, and went into the sepulchre, and seeth the linen clothes lie, And the napkin, that was about his head, not lying with the linen clothes, but wrapped together in a place by itself. Then went in also that other disciple, which came first to the sepulchre, and he saw, and believed. For as yet they knew not the scripture, that he must rise again from the dead. Then the disciples went away again unto their own home.",
        reference: "John 20:1-10",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Peter and John ran to the tomb and found it empty. The grave clothes were still there, lying where the body had been. The cloth that had covered the face of Jesus was folded neatly and set apart.\n\nThis was no robbery. A thief would not have left the grave clothes behind, and certainly would not have folded them. John tells us that when he saw these things, \"he saw, and believed.\" The empty tomb spoke for itself. Something miraculous had happened. The one who had been dead was alive again.\n\nThe disciples went home, but Mary Magdalene stayed behind. She stood outside the tomb weeping. And there, in her grief, she was about to have the most wonderful encounter of her life.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "John saw the empty tomb and the folded grave clothes, and he believed. What evidence of the resurrection gives you the strongest sense of confidence in your faith?\n\nMary stayed at the tomb even after the disciples went home. What does her devotion to Jesus teach you about drawing near to Him, even when circumstances are confusing?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "But Mary stood without at the sepulchre weeping: and as she wept, she stooped down, and looked into the sepulchre, And seeth two angels in white sitting, the one at the head, and the other at the feet, where the body of Jesus had lain. And they say unto her, Woman, why weepest thou? She saith unto them, Because they have taken away my Lord, and I know not where they have laid him. And when she had thus said, she turned herself back, and saw Jesus standing, and knew not that it was Jesus. Jesus saith unto her, Woman, why weepest thou? whom seekest thou? She, supposing him to be the gardener, saith unto him, Sir, if thou have borne him hence, tell me where thou hast laid him, and I will take him away. Jesus saith unto her, Mary. She turned herself, and saith unto him, Rabboni; which is to say, Master. Jesus saith unto her, Touch me not; for I am not yet ascended to my Father: but go to my brethren, and say unto them, I ascend unto my Father, and your Father; and to my God, and your God. Mary Magdalene came and told the disciples that she had seen the Lord, and that he had spoken these things unto her.",
        reference: "John 20:11-18",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Mary did not recognize Jesus at first. Her eyes were filled with tears and her heart was heavy with grief. But then Jesus spoke her name: \"Mary.\" In that single word, she knew Him. The voice of the Good Shepherd called His sheep by name, and she recognized Him immediately.\n\nShe cried out, \"Rabboni!\" which means Master or Teacher. Her sorrow turned to overwhelming joy in an instant. The one she thought was gone forever was standing right in front of her, alive and well.\n\nJesus sent Mary to carry the greatest news the world has ever heard. She went to the disciples and said, \"I have seen the Lord.\" She was the first person to proclaim the resurrection.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus called Mary by name, and she recognized His voice immediately. How do you hear Jesus calling your name and speaking to you in your own life?\n\nMary was the first person to share the good news of the resurrection. Who in your life needs to hear a word of hope, and how might you share it with them?",
        projectable: true,
      },
      {
        type: "scripture_reading",
        content:
          "But Thomas, one of the twelve, called Didymus, was not with them when Jesus came. The other disciples therefore said unto him, We have seen the Lord. But he said unto them, Except I shall see in his hands the print of the nails, and put my finger into the print of the nails, and thrust my hand into his side, I will not believe. And after eight days again his disciples were within, and Thomas with them: then came Jesus, the doors being shut, and stood in the midst, and said, Peace be unto you. Then saith he to Thomas, Reach hither thy finger, and behold my hands; and reach hither thy hand, and thrust it into my side: and be not faithless, but believing. And Thomas answered and said unto him, My Lord and my God. Jesus saith unto him, Thomas, because thou hast seen me, and hast believed: blessed are they that have not seen, and yet have believed.",
        reference: "John 20:24-29",
        version: "KJV",
        projectable: true,
      },
      {
        type: "teaching",
        content:
          "Thomas had not been there when Jesus first appeared to the disciples. When they told him the news, he struggled to believe it. He said he needed to see and touch the wounds for himself.\n\nJesus did not scold Thomas for his doubts. Instead, He came to him and gently invited him to see and touch and believe. When Thomas saw the risen Lord, he made one of the greatest declarations of faith in the Bible. He said, \"My Lord and my God.\" All of his doubt melted away in the presence of the living Savior.\n\nThen Jesus spoke a blessing that reaches across the centuries to us: \"Blessed are they that have not seen, and yet have believed.\" That blessing is for everyone who puts their faith in the risen Christ today.",
        projectable: true,
      },
      {
        type: "discussion",
        content:
          "Jesus met Thomas right where he was in his doubt and gently invited him to believe. How does this encourage you when you face moments of uncertainty in your own faith?\n\nJesus said, \"Blessed are they that have not seen, and yet have believed.\" What helps you believe and trust in Jesus even though you have not seen Him with your eyes?",
        projectable: true,
      },
      {
        type: "application",
        content:
          "This week, carry the joy of the resurrection with you each day. When worries come, remind yourself that the same power that raised Jesus from the grave is at work in your life. Share the good news with someone who needs hope. You might simply say, \"Jesus is alive, and He loves you.\"",
        projectable: true,
      },
    ],
    discussionQuestions: [
      "John saw the empty tomb and the folded grave clothes, and he believed. What evidence of the resurrection gives you the strongest sense of confidence in your faith?",
      "Mary stayed at the tomb even after the disciples went home. What does her devotion to Jesus teach you about drawing near to Him, even when circumstances are confusing?",
      "Jesus called Mary by name, and she recognized His voice immediately. How do you hear Jesus calling your name and speaking to you in your own life?",
      "Mary was the first person to share the good news of the resurrection. Who in your life needs to hear a word of hope, and how might you share it with them?",
      "Jesus met Thomas right where he was in his doubt and gently invited him to believe. How does this encourage you when you face moments of uncertainty in your own faith?",
      "Jesus said, \"Blessed are they that have not seen, and yet have believed.\" What helps you believe and trust in Jesus even though you have not seen Him with your eyes?",
    ],
  },
];

export const mockLessons: MockLesson[] = [...johnLessons];