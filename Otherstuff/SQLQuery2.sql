ALTER TABLE [Tomb Raider]
ADD Title varchar (100)

EXEC sp_rename 'Tomb Raider', 'TombRaider'


select *
from [TombRaider]


UPDATE [TombRaider] 
SET 
 StartCountry='Mediterranean Sea'
where Id = '9';

EXEC sp_rename '[StartingLocation]' , 'StartingLocation'

ALTER TABLE TombRaider
ADD StartCountry varchar (100)



insert into [TombRaider] (StartCountry)
Values ('Peru');



insert into [Tomb Raider] (Game,Year,Artifact,Title)
Values ('Tomb Raider X','2015','The Divine Source','Rise of the Tomb Raider');




DELETE FROM TombRaider
WHERE Id=12;


USE [NewFoxtrot]
GO

CREATE TABLE [TombRaider](
	[Id] [int] NOT NULL IDENTITY(1,1),
	[Game] [nvarchar](150) NULL,
	[Year] [int] NULL,
	[Artifact] [nvarchar](150) NULL,
	[Title] [nvarchar](150) NULL,
	[StartingLocation] [nvarchar](150) NULL,
	[MinorArtifacts] [nvarchar](200) NULL,
	);


