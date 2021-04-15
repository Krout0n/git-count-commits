import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import './App.css';
import { FolderItem, CommitCountData } from './types';
import { sortAuthorNames, countMaxCommits } from './utils';
import { AuthorSelector } from './components/AuthorSelector';
import { DirectoryTree } from './components/DirectoryTree';
import { LabeledSwitch } from './components/LabeledSwitch';
import directoryTree from './data/mecab-directoryTree.json';
import commitCountData from './data/mecab-commitCount.json';

export const App: React.VFC = () => {
  const directoryTree = directoryTreeJson as FolderItem;
  const commitCountData = commitCountDataJson as CommitCountData;

  const authorNames = sortAuthorNames(Object.keys(commitCountData));
  const [authorName, setAuthorName] = useState(authorNames[0]);
  const [showUncommittedItems, setShowUncommittedItems] = useState(true);

  const commitCountDataPerAuthor = commitCountData[authorName];
  const maxCommitCount = countMaxCommits(directoryTree, commitCountDataPerAuthor);

  return (
    <div className="App">
      <Container
        maxWidth="sm"
        style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
      >
        <AuthorSelector
          authorName={authorName}
          authorNames={authorNames}
          setAuthorName={setAuthorName}
        />
        <LabeledSwitch
          label="Hide files without commits by this person"
          value={!showUncommittedItems}
          setValue={(value) => setShowUncommittedItems(!value)} />
        <DirectoryTree
          root={directoryTree}
          commitCountData={commitCountDataPerAuthor}
          maxCommitCount={maxCommitCount}
          showUncommittedItems={showUncommittedItems}
        />
      </Container>
    </div>
  );
};
