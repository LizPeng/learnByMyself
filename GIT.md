### 从现有仓库克隆

    git clone [url]

### 检查当前文件状态
	
    $ git status
    On branch master
    nothing to commit, working directory clean

说明工作目录感觉，所有已跟踪文件在上次提交后都未被更改过。

### 跟踪新文件&暂存已修改文件

    git add READEME.md

开始跟踪一个新文件。git add 后面可以指明要跟踪的文件或目录路径。

###　忽略某些文件

    $ cat .gitignore
    *.[oa]
    *~

第一行告诉Git忽略所有以.o或.a结尾的文件，第二行告诉Git忽略所有以波浪符~结尾的文件，

    # 此为注释 – 将被 Git 忽略
    # 忽略所有 .a 结尾的文件
    *.a
    # 但 lib.a 除外
    !lib.a
    # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
    /TODO
    # 忽略 build/ 目录下的所有文件
    build/
    # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
    doc/*.txt
    # ignore all .txt files in the doc/ directory
    doc/**/*.txt

### 提交更新 

git commit，只要在提交的时候，给 git commit 加上 -a 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 git add 步骤：

    $ git commit -a -m 'added new benchmarks'
    

### 移除文件

git rm 

##  从远程仓库抓取数据

如果是克隆了一个仓库，此命令会自动将远程仓库归于origin名下。所以，`git fetch origin`会抓取从你上次克隆以来别人上传到此远程仓库中的所有更新。**fetch只是将远端的数据拉取到本地仓库，并不会自动合并到当前工作分支**。

## 推送数据到远程仓库

`git push [remote-name] [branch-name]`。如果要把本地的 master 分支推送到 origin 服务器上


### 查看远程仓库信息 

git remote show [remote-name] 查看某个远程仓库的详细信息，比如要看所克隆的 origin 仓库

    git remote show origin 


### 创建一个新的分支
    
    git branch [branch-name]

仅仅是创建了一个新的分支，**不会自动切换**到这个分支中去。

### 切换到其他分支

    git checkout [branch-name]
![](https://git-scm.com/figures/18333fig0308-tn.png)

git checkout master做了两件事，它把HEAD指针移回到master分支，并把工作目录中的文件换成了master分支所指向的快照内容。也就是说，现在开始的所作的改动，将始于项目中一个较老的版本。它的主要作用是将testing分支做出的修改暂时取消，这样你就可以向另一个方向进行开发。

    git checkout -b iss53

相当于创建并切换到新创建分支

## 合并分支

回到master分支把它可并过来，使用git merge进行合并


    $ git checkout master
    $ git merge hotfix
    Updating f42c576..3a0874c
    Fast-forward
     README | 1 -
     1 file changed, 1 deletion(-)

请注意，合并时出现了“Fast forward”的提示。由于当前 master 分支所在的提交对象是要并入的 hotfix 分支的直接上游，Git 只需把 master 分支指针直接右移。换句话说，如果顺着一个分支走下去可以到达另一个分支的话，那么 Git 在合并两者时，只会简单地把指针右移，因为这种单线的历史分支不存在任何需要解决的分歧，所以这种合并过程可以称为快进（Fast forward）。

    $ git branch -d hotfix
    Deleted branch hotfix (was 3a0874c).

由于master和hotfix分支都只想相同的提交对象，所以可以删除hotfix分支
    

### 分支的管理

git branch 列出当前所有分支的清单

git branch -v 查看各个分支最后一个提交对象的信息

git branch --merged 查看哪些分支已被并入当前分支

git branch --no-merged 查看尚未合并的工作：


###  git ftech origin 

在本地工作的同时，有人向远程仓库推送内容会让提交历史开始分流。

![](https://git-scm.com/figures/18333fig0323-tn.png)

同步远程服务器上的数据到本地。该命令首先找到origin是哪个服务器，从上面获取你尚未拥有的数据，更新的你的本地数据库，然后把origin/master的指针移到它最新的位置上。

![](https://git-scm.com/figures/18333fig0324-tn.png)


##　分支的衍合

把一个分支中的修改整合到拎一个分支的办法有两种：merge和rebase